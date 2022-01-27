export function generateID() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

export function deleteArrayElement(arr: any[], index: number) {
  if (arr.length > 1) 
    arr.splice(index, 1);
  else 
    arr.splice(index);

  return arr;
}

export function generateEmptyTrainingDirSh(agenda_name: string, triggers: string) {
  let sh_script: string = `#!/bin/bash
if [ "$1" == "" ]; then
    echo "Need one input argument: path to training data directory"
    exit
fi

echo "PATH: $1";
echo "AGENDA: ${agenda_name}";

agenda_path=$1/${agenda_name};

echo "AGENDA_PATH: $agenda_path"

if [ -d "$agenda_path" ]; then
\techo "$agenda_path directory already existed";
else
\tmkdir -p $agenda_path;
\techo "$agenda_path directory is created";
fi

triggers="${triggers}"

for t in $triggers;
do
\ttrigger_path=$agenda_path/$t
\tif [ -d "$trigger_path" ]; then
\t\techo "$trigger_path directory already existed";
\telse
\t\tmkdir -p $trigger_path
\t\techo "$trigger_path directory is created";
\t\tcd $trigger_path;
\t\ttouch $t.txt;
\t\techo "$t.txt file is created";
\t\ttouch NOT$t.txt;
\t\techo "NOT$t.txt file is created";
\tfi
done`;

  return sh_script;

}