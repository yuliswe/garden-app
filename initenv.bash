poetry env use python3.11
poetry install
poetry run nodeenv -n 18.17.0 .nodevenv
npx -y npm@9 install
