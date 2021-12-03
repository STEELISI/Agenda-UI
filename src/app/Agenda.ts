import { State } from './State';
import { Transition } from './Transition';
import { Action } from './Action';
import { ActionMap } from './ActionMap';
import { Policy } from './Policy';
import { generateID } from './utils';

export interface Agenda {
    "name": string;
    "states": {"name": string, "description": string}[];
    "start_state_name": string;
    "terminus_names": string[];
    "transition_triggers": {"name": string, "description": string}[];
    "kickoff_triggers": {"name": string, "description": string}[];
    "transitions": {[key: string]: {[key: string]: string}};
    "actions": {"name": string, "text": string, "exclusive_flag": boolean, "allowed_repeats": number}[];
    "action_map": {[key: string]: string[]};
    "stall_action_map": {[key: string]: string[]};
    "policy": {
      "reuse": boolean,
      "max_transitions": number,
      "absolute_accept_thresh": number,
      "min_accept_thresh_w_differential": number,
      "accept_thresh_differential": number,
      "kickoff_thresh": number
    };
};

export function extractAgenda(agenda: Agenda) {
  let name: string = '';
  let states: State[] = [];
  let transitions: Transition[] = [];
  let actions: Action[] = [];
  let actionMaps: ActionMap[] = [];
  let stallMaps: ActionMap[] = [];
  let policy: Policy = {} as Agenda["policy"];

  /* --- AGENDA Name --- */
  name = agenda.name;

  /* --- STATE Filling --- */
  agenda.states.forEach((st) => {
    states.push({
      id: generateID(), 
      name: st.name, 
      description: st.description,
      start: false,
      terminus: false
    });
  });

  agenda.terminus_names.forEach((name) => {
    let terminus_index = states.findIndex((st) => st.name == name);
    states[terminus_index].terminus = true;
  });

  let start_index = states.findIndex((st) => st.name == agenda.start_state_name);
  states[start_index].start = true;
  /* --------- */ 

  /* --- TRANSITION Filling --- */
  for (var from_name of Object.keys(agenda.transitions)) {
    for (var trigger of Object.keys(agenda.transitions[from_name])){
      /*console.log(from + ", " + trigger + ", " + agenda.transitions[from_name][trigger]);*/

      let to_name = agenda.transitions[from_name][trigger]; 
      
      let from_index = states.findIndex((st) => st.name == from_name); 
      let to_index = states.findIndex((st) => st.name == to_name);
      let trigger_index = agenda.transition_triggers.findIndex((tt) => tt.name = trigger);

      transitions.push({
        id: generateID(),
        from: states[from_index],
        to: states[to_index],
        trigger: agenda.transition_triggers[trigger_index].name,
        description: agenda.transition_triggers[trigger_index].description 
      });
    }
  }
 
  agenda.kickoff_triggers.forEach((kt) => {
      transitions.push({
        id: 'kickoff'+ generateID(),
        from: {} as State,
        to: states[start_index],
        trigger: kt.name,
        description: kt.description 
      });
  });
  /* --------- */ 

  /* --- ACTION Filling --- */
  agenda.actions.forEach((at) => {
    actions.push({
      id: generateID(),
      name: at.name,
      utterance: at.text,
      flag: at.exclusive_flag,
      repeat: at.allowed_repeats
    });
  });
  /* --------- */ 
  
  /* --- MAP Filling --- */
  states.forEach((st) => {
    let act_names = agenda.action_map[st.name];
    let acts: Action[] = [];
    act_names.forEach((act_name) => {
      let index = actions.findIndex((act) => act.name == act_name);
      acts.push(actions[index]);
    });
    actionMaps.push({
      state: st,
      actions: acts
    });

    let stl_names = agenda.stall_action_map[st.name];
    let stls: Action[] = [];
    stl_names.forEach((stl_name) => {
      let index = actions.findIndex((act) => act.name == stl_name);
      stls.push(actions[index]);
    });
    stallMaps.push({
      state: st,
      actions: stls
    });
  });
  /* --------- */ 

  /* --- POLICY Filling --- */
  policy = agenda.policy;
  /* --------- */ 

  return {
    name,
    states,
    transitions,
    actions,
    actionMaps,
    stallMaps,
    policy
  };

}

export function generateAgenda(
  name: string,
  states: State[], 
  transitions: Transition[],
  actions: Action[],
  actionMaps: ActionMap[],
  stallMaps: ActionMap[],
  policy: Policy 
  ){

  let agenda: Agenda = {
    "name": '',
    "states": [],
    "start_state_name": '',
    "terminus_names": [],
    "transition_triggers": [],
    "kickoff_triggers": [],
    "transitions": {},
    "actions": [],
    "action_map": {},
    "stall_action_map": {},
    "policy": {} as Policy
  };

  agenda.name = name;

  states.forEach((st) => {
    if (st.name == "KICKOFF") {
      return;
    }
    agenda.states.push({"name": st.name, "description": st.description});
    if (st.start) agenda.start_state_name = st.name;
    if (st.terminus) agenda.terminus_names.push(st.name);
  });

  transitions.forEach((ts) => {
    if (ts.from.name == "KICKOFF") {
      agenda.kickoff_triggers.push({name: ts.trigger, description: ts.description});
      return;
    }

    agenda.transition_triggers.push({name: ts.trigger, description: ts.description});
    if (!(ts.from.name in agenda.transitions)) {
      agenda.transitions[ts.from.name] = {};
    }
    agenda.transitions[ts.from.name][ts.trigger] = ts.to.name;
  });

  actions.forEach((act) => {
    agenda.actions.push({
      "name": act.name, 
      "text": act.utterance, 
      "exclusive_flag": act.flag, 
      "allowed_repeats": act.repeat
    });
  });

  actionMaps.forEach((action_map) => {
    let key = action_map.state.name;
    if (!(key in agenda.action_map)) {
      agenda.action_map[key] = [];
    }
    action_map.actions.forEach((act) => {
      agenda.action_map[key].push(act.name);
    });
  });
 
  stallMaps.forEach((stall_map) => {
    let key = stall_map.state.name;
    if (!(key in agenda.stall_action_map)) {
      agenda.stall_action_map[key] = [];
    }
    stall_map.actions.forEach((act) => {
      agenda.stall_action_map[key].push(act.name);
    });
  });
  
  agenda.policy = policy;

  return agenda
}
