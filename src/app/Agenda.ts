export interface Agenda {
    "states": {"name": string, "description": string}[];
    "start_state_name": string;
    "terminus_names": string[];
    "transition_triggers": {"name": string, "description": string}[];
    "transitions": {[key: string]: {[key: string]: string}};
};
