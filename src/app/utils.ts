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
  let sh_script: string = 
`#!/bin/bash
if [ "$1" == "" ]; then
  echo "Need one input argument: path to training data directory"
  exit
fi

echo "PATH: $1";
echo "AGENDA: get_contact_info";

agenda_path=$1/agendas/
if [ -d "$agenda_path" ]; then
  echo "$agenda_path directory already existed";
else
  mkdir -p $agenda_path;
  echo "$agenda_path directory is created";
fi

yaml_file=get_contact_info.yaml
echo "copy $yaml_file file to $agenda_path directory";
cp $yaml_file $agenda_path

nli_path=$1/nli_premises/get_contact_info;
nlu_path=$1/nlu_training_data/get_contact_info;

echo "NLI_PATH: $nli_path"
echo "NLU_PATH: $nlu_path"

if [ -d "$nli_path" ]; then
  echo "$nli_path directory already existed";
else
  mkdir -p $nli_path;
  echo "$nli_path directory is created";
fi

if [ -d "$nlu_path" ]; then
  echo "$nlu_path directory already existed";
else
  mkdir -p $nlu_path;
  echo "$nlu_path directory directory is created";
fi

triggers="name yes_name no_name yes_phone_number no_phone_number"

for t in $triggers;
do
  nli_trigger_file=$nli_path/$t.txt
  if [ -f "$nli_trigger_file" ]; then
    echo "$nli_trigger_file file already existed";
  else
    touch $nli_trigger_file;
    echo "$nli_trigger_file file is created";
  fi
  
  nlu_trigger_dir=$nlu_path/$t
  if [ -d "$nlu_trigger_dir" ]; then
    echo "$nlu_trigger_dir directory already existed";
  else
    mkdir -p $nlu_trigger_dir
    echo "$nlu_trigger_dir file is created";
    touch $nlu_trigger_dir/$t.txt;
    echo "$nlu_trigger_dir/$t.txt file is created";
    touch $nlu_trigger_dir/NOT$t.txt;
    echo "$nlu_trigger_dir/NOT$t.txt file is created";
  fi
done


for FILE in "$nli_path"/*; 
  do
  file=\${FILE##*/}
  newFile=\${file%%.txt*}
  echo "$newFile"
  [[ $triggers =~ "(^|[[:space:]])"$newFile"($|[[:space:]])" ]] && echo 'yes' || rm $FILE
done

for FOLDER in "$nlu_path"/*; 
  do
  folder_name=\${FOLDER##*/}
  echo "file is $folder_name"
  [[ $triggers =~ "(^|[[:space:]])"$folder_name"($|[[:space:]])" ]] && echo 'yes' || rm -r $FOLDER
done
echo "END"`;

  return sh_script;
}
