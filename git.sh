#!/bin/bash
seconds=0
type="-"
git=0
node=0
npm=0
node_modules=0
add=0
commit=0
pull=0
push=0

verify_not_print() {
  if [[ $(git --version) ]]; then
    git=1
  else
    git=0
  fi
  if [[ $(node --version) ]]; then
    node=1
  else
    node=0
  fi
  if [[ $(npm --version) ]]; then
    npm=1
  else
    npm=0
  fi
  if [[ -d "node_modules" ]]; then
    node_modules=1
  else
    node_modules=0
  fi
}

verify() {
  clear
  while [ $seconds -lt 2 ]
  do
    if [[ $type=="-" ]]; then 
      clear
      echo "$(tput setaf 3)$type $(tput setaf 7)Comprobando si git existe"
      type="\ "
      sleep 0.5
    fi
    if [[ $type=="\ " ]]; then 
      clear
      echo "$(tput setaf 3)$type$(tput setaf 7)Comprobando si git existe"
      type="|"
      sleep 0.5
    fi
    if [[ $type=="|" ]]; then
      clear
      echo "$(tput setaf 3)$type $(tput setaf 7)Comprobando si git existe"
      type="/"
      sleep 0.5
    fi
    if [[ $type=="/" ]]; then
      clear
      echo "$(tput setaf 3)$type $(tput setaf 7)Comprobando si git existe"
      type="-"
      sleep 0.5
    fi


    ((seconds=seconds+1))
  done
  
  type="-"
  seconds=0

  if [[ $(git) ]]; then
    clear
    echo "$(tput setaf 2) $(tput setaf 7)Git encontrado"
    sleep 1
    git=1
  else
    clear
    echo "$(tput setaf 1) $(tput setaf 7)No tienes git."
    sleep 1
    exit 1
    git=0
  fi

  clear
  while [ $seconds -lt 2 ]
  do
    if [[ $type=="-" ]]; then 
      clear
      echo "$(tput setaf 3)$type $(tput setaf 7)Comprobando si node existe"
      type="\ "
      sleep 0.5
    fi
    if [[ $type=="\ " ]]; then 
      clear
      echo "$(tput setaf 3)$type$(tput setaf 7)Comprobando si node existe"
      type="|"
      sleep 0.5
    fi

    if [[ $type=="|" ]]; then
      clear
      echo "$(tput setaf 3)$type $(tput setaf 7)Comprobando si node existe"
      type="/"
      sleep 0.5
    fi
    if [[ $type=="/" ]]; then
      clear
      echo "$(tput setaf 3)$type $(tput setaf 7)Comprobando si node existe"
      type="-"
      sleep 0.5
    fi
    
    ((seconds=seconds+1))
  done

  seconds=0
  type="-"

  if [[ $(node --version) ]]; then
    clear
    echo "$(tput setaf 2) $(tput setaf 7)Node.JS encontrado"
    sleep 1
    node=1
  else
    clear
    echo "$(tput setaf 1) $(tput setaf 7)Node.JS no fue encontrado, saliendo de la herramienta"
    sleep 1
    node=0
  fi
 
  clear
  while [ $seconds -lt 2 ]
  do
    if [[ $type=="-" ]]; then 
      clear
      echo "$(tput setaf 3)$type $(tput setaf 7)Comprobando si npm existe"
      type="\ "
      sleep 0.5
    fi
    if [[ $type=="\ " ]]; then 
      clear
      echo "$(tput setaf 3)$type$(tput setaf 7)Comprobando si npm existe"
      type="|"
      sleep 0.5
    fi

    if [[ $type=="|" ]]; then
      clear
      echo "$(tput setaf 3)$type $(tput setaf 7)Comprobando si npm existe"
      type="/"
      sleep 0.5
    fi
    if [[ $type=="/" ]]; then
      clear
      echo "$(tput setaf 3)$type $(tput setaf 7)Comprobando si npm existe"
      type="-"
      sleep 0.5
    fi
    ((seconds=seconds+1))
  done

  seconds=0
  type="-"

  if [[ $(npm --version) ]]; then
    clear
    echo "$(tput setaf 2) $(tput setaf 7)NPM fue encontrado"
    sleep 1
    npm=1
  else
    echo "$(tput setaf 1) $(tput setaf 7)NPM no fue encontrado"
    sleep 2
    npm=0
  fi

  clear
  while [ $seconds -lt 2 ]
  do
    if [[ $type=="-" ]]; then 
      clear
      echo "$(tput setaf 3)$type $(tput setaf 7)Comprobando si node_modules existe"
      type="\ "
      sleep 0.5
    fi
    if [[ $type=="\ " ]]; then 
      clear
      echo "$(tput setaf 3)$type$(tput setaf 7)Comprobando si node_modules existe"
      type="|"
      sleep 0.5
    fi
    if [[ $type=="|" ]]; then
      clear
      echo "$(tput setaf 3)$type $(tput setaf 7)Comprobando si node_modules existe"
      type="/"
      sleep 0.5
    fi
    if [[ $type=="/" ]]; then
      clear
      echo "$(tput setaf 3)$type $(tput setaf 7)Comprobando si node_modules existe"
      type="-"
      sleep 0.5
    fi
    ((seconds=seconds+1))
  done
  
  seconds=0
  type="-"

  if [[ -d "node_modules" ]]; then
    clear
    echo "$(tput setaf 2) $(tput setaf 7)node_modules fue encontrado."
    sleep 1
    node_modules=1
  else
    echo "$(tput setaf 1) $(tput setaf 7)node_modules no fue encontrado, instalando paqueteria."
    sleep 2
    npm install
    clear
    node_modules=0
  fi
}

push() {
  clear
  while [ $seconds -lt 1 ]
  do
    if [[ $type=="-" ]]; then 
      clear
      echo "$(tput setaf 3)$type $(tput setaf 7)Agregando inserciones"
      type="\ "
      sleep 0.5
    fi
    if [[ $type=="\ " ]]; then 
      clear
      echo "$(tput setaf 3)$type$(tput setaf 7)Agregando inserciones"
      type="|"
      sleep 0.5
    fi

    if [[ $type=="|" ]]; then
      clear
      echo "$(tput setaf 3)$type $(tput setaf 7)Agregando inserciones"
      type="/"
      sleep 0.5
    fi
    if [[ $type=="/" ]]; then
      clear
      echo "$(tput setaf 3)$type $(tput setaf 7)Agregando inserciones"
      type="-"
      sleep 0.5
    fi


    ((seconds=seconds+1))
  done
  
  type="-"
  seconds=0
  if [[ $(git add .) == "" ]]; then
    git add .
    clear
    echo "$(tput setaf 2) $(tput setaf 7)Inserciones agregadas"
    add=1
  else
    clear
    echo "$(tput setaf 1) $(tput setaf 7)Inserciones no agregadas"
    add=0
  fi

  sleep 0.5

  clear
  while [ $seconds -lt 1 ]
  do
    if [[ $type=="-" ]]; then 
      clear
      echo "$(tput setaf 3)$type $(tput setaf 7)Verificando cambios"
      type="\ "
      sleep 0.5
    fi
    if [[ $type=="\ " ]]; then 
      clear
      echo "$(tput setaf 3)$type$(tput setaf 7)Verificando cambios"
      type="|"
      sleep 0.5
    fi
    if [[ $type=="|" ]]; then
      clear
      echo "$(tput setaf 3)$type $(tput setaf 7)Verificando cambios"
      type="/"
      sleep 0.5
    fi
    if [[ $type=="/" ]]; then
      clear
      echo "$(tput setaf 3)$type $(tput setaf 7)Verificando cambios"
      type="-"
      sleep 0.5
    fi


    ((seconds=seconds+1))
  done
  
  type="-"
  seconds=0

  if [[ $(git merge) ]]; then
    git merge
    pull=1
    if [[ $(git pull origin main) ]]; then
      git pull origin main
      clear
      echo "$(tput setaf 2) $(tput setaf 7)Cambios verificados"
      pull=1
    else
      echo "$(tput setaf 1) $(tput setaf 7)Cambios no verificados"
      pull=0
    fi
  else
    clear
    echo "$(tput setaf 1) $(tput setaf 7)Cambios no verificados"
    pull=0
  fi
  sleep 0.5

  clear
  while [ $seconds -lt 1 ]
  do
    if [[ $type=="-" ]]; then 
      clear
      echo "$(tput setaf 3)$type $(tput setaf 7)Creando commit ($commit_name)"
      type="\ "
      sleep 0.5
    fi
    if [[ $type=="\ " ]]; then 
      clear
      echo "$(tput setaf 3)$type$(tput setaf 7)Creando commit ($commit_name)"
      type="|"
      sleep 0.5
    fi

    if [[ $type=="|" ]]; then
      clear
      echo "$(tput setaf 3)$type $(tput setaf 7)Creando commit ($commit_name)"
      type="/"
      sleep 0.5
    fi
    if [[ $type=="/" ]]; then
      clear
      echo "$(tput setaf 3)$type $(tput setaf 7)Creando commit ($commit_name)"
      type="-"
      sleep 0.5
    fi


    ((seconds=seconds+1))
  done

  type="-"
  seconds=0

  if [[ $(git commit -m "$commit_name") ]]; then
    git commit -m "$commit_name"
    clear
    echo "$(tput setaf 2) $(tput setaf 7)Commit creado ($commit_name)"
    commit=1
  else
    clear
    echo "$(tput setaf 1) $(tput setaf 7)Commit no creado ($commit_name)"
    commit=0
  fi

  sleep 0.5
  
  clear
  while [ $seconds -lt 1 ]
  do
    if [[ $type=="-" ]]; then 
      clear
      echo "$(tput setaf 3)$type $(tput setaf 7)Subiendo commit ($commit_name)"
      type="\ "
      sleep 0.5
    fi
    if [[ $type=="\ " ]]; then 
      clear
      echo "$(tput setaf 3)$type$(tput setaf 7)Subiendo commit ($commit_name)"
      type="|"
      sleep 0.5
    fi
    if [[ $type=="|" ]]; then
      clear
      echo "$(tput setaf 3)$type $(tput setaf 7)Subiendo commit ($commit_name)"
      type="/"
      sleep 0.5
    fi
    if [[ $type=="/" ]]; then
      clear
      echo "$(tput setaf 3)$type $(tput setaf 7)Subiendo commit ($commit_name)"
      type="-"
      sleep 0.5
    fi


    ((seconds=seconds+1))
  done
  
  type="-"
  seconds=0

  if [[ $(git push -u origin main) ]]; then
    git push -u origin main
    clear
    echo "$(tput setaf 2) $(tput setaf 7)Se subio el commit con exito ($commit_name)"
    push=1
  else
    clear
    echo "$(tput setaf 1) $(tput setaf 7)Commit no subido ($commit_name)"
    push=0
  fi
  
  sleep 0.5
  clear
}

list_exito() {
  if [[ $git -eq 1 ]]; then
    echo "$(tput setaf 2) $(tput setaf 7)Git fue encontrado"
    sleep 0.3
  else
    echo "$(tput setaf 1) $(tput setaf 7)Git no fue encontrado"
    sleep 0.3
  fi
  if [[ $node -eq 1 ]]; then
    echo "$(tput setaf 2) $(tput setaf 7)Node.JS fue encontrado"
    sleep 0.3
  else
    echo "$(tput setaf 1) $(tput setaf 7)Node.JS no fue encontrado"
    sleep 0.3
  fi
  if [[ $npm -eq 1 ]]; then
    echo "$(tput setaf 2) $(tput setaf 7)NPM fue encontrado"
    sleep 0.3
  else
    echo "$(tput setaf 1) $(tput setaf 7)NPM no fue encontrado"
    sleep 0.3
  fi
  if [[ $node_modules -eq 1 ]]; then
    echo "$(tput setaf 2) $(tput setaf 7)node_modules fue encontrado"
    sleep 0.3
  else
    echo "$(tput setaf 1) $(tput setaf 7)node_modules no fue encontrado"
    sleep 0.3
  fi

  if [[ $commit_name == "Not expecified name" ]]; then
    echo "$(tput setaf 1) $(tput setaf 7)Nombre del commit no especificado ($commit_name)"
  else
    echo "$(tput setaf 2) $(tput setaf 7)Nombre del commit especificado ($commit_name)"
  fi

  if [[ $add -eq 1 ]]; then
    echo "$(tput setaf 2) $(tput setaf 7)Inserciones agregadas"
    sleep 0.3
  else
    echo "$(tput setaf 1) $(tput setaf 7)Inserciones no agregadas"
    sleep 0.3
  fi
  if [[ $commit -eq 1 ]]; then
    echo "$(tput setaf 2) $(tput setaf 7)Commit creado ($commit_name)"
    sleep 0.3
  else
    echo "$(tput setaf 1) $(tput setaf 7)Commit no creado ($commit_name)"
    sleep 0.3
  fi
  if [[ $pull -eq 1 ]]; then
    echo "$(tput setaf 2) $(tput setaf 7)Cambios verificados"
    sleep 0.3
  else
    echo "$(tput setaf 1) $(tput setaf 7)Cambios no verificados"
    sleep 0.3
  fi
  if [[ $push -eq 1 ]]; then
    echo "$(tput setaf 2) $(tput setaf 7)Se subio el commit con exito ($commit_name)"
    sleep 0.3
  else
    echo "$(tput setaf 1) $(tput setaf 7)Commit no subido ($commit_name)"
    sleep 0.3
  fi
  exit 1
}

case "$1" in
  -h | --help )
    echo "Usage: ./git.sh [commit name] [option]"
    echo "-nv | --not-verifies = Cancela las verificaciones y solo pushea"
    echo "-nl | --not-list = No lista las ejecuciones exitosas"
    echo "-nlnv = Cancela las verificaciones y no lista las ejecuciones exitosas"
    echo "-nvnl = Cancela las verificaciones y no lista las ejecuciones exitosas"
    echo "-h | --help = Muestra el panel de ayuda"
    exit 1
  ;;
esac

if [[ -z $1 ]]; then
  commit_name="Not expecified name"
else
  sleep 1
  case "$1" in
    -nv | --not-verifies )
      commit_name="Not expecified name"
      verify_not_print
      push
      list_exito
    ;;
    -nl | --not-list )
      commit_name="Not expecified name"
      verify
      push
      list_exito
    ;;
    -nvnl)
      commit_name="Not expecified name"
      verify_not_print
      push
    ;;
    -nlnv)
      commit_name="Not expecified name"
      verify_not_print
      push
    ;;
    * )
       commit_name=$1
    ;;
  esac
fi

if [[ $commit_name != "Not expecified name" ]]; then
  if [[ -z $2 ]]; then
    verify
    sleep 2
    push
    sleep 1
    list_exito
    sleep 1
    exit 1
  fi

  case "$2" in
    -nv | --not-verifies )
      verify_not_print
      push
      list_exito
    ;;
    -nl | --not-list )
      verify
      push
      list_exito
    ;;
    -nvnl)
      verify_not_print
      push
    ;;
    -nlnv)
      verify_not_print
      push
    ;;
    * )
      verify
      sleep 2
      push
      sleep 1
      list_exito
    ;;
  esac
fi
