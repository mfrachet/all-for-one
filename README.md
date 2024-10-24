[Notion](https://www.notion.so/zealy/Data-Visualization-Insights-Tool-121d7dcc68488045b2e2ed8153bf9fa7?pvs=4)

```sh
$ git clone https://github.com/mfrachet/all-for-one
$ cd all-for-one
$ pnpm i
$ pnpm dev
```

- frontend is http://localhost:5173/

Setting up meltano. (TBC)

```sh
$ docker compose up

// install pyenv
$ brew install pyenv

// install meltano
$ docker pull meltano/meltano
$ docker run meltano/meltano --version

// install meltano dependencies
cd meltano_project
docker run --rm --net=host -v $(pwd):/project -w /project meltano/meltano install
docker run --rm --net=host -v $(pwd):/project -w /project meltano/meltano run tap-stripe target-clickhouse

```
