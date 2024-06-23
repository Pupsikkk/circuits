#!/bin/bash

export DATABASE_HOST=127.0.0.1

FOLDER=./src/app/database/migrations/
TYPEORM=./node_modules/typeorm/cli.js
TSNODE=ts-node/register
TSPATHS=tsconfig-paths/register

NAME=${1?missing - migration name.}
TIME=${2:-$(($(gdate +%s%N) / 1000000))}

echo $NAME

node -r $TSNODE -r $TSPATHS $TYPEORM migration:generate $FOLDER/$NAME -d $FOLDER/../orm.config.ts -t $TIME &&
    echo "export * from './$TIME-$NAME';" >>$FOLDER/index.ts