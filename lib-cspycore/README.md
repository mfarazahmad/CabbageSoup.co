# cspycore

A library that implements common functionality throughout services

## Build Steps:

Create a virtual environment for project
```
py -m venv env
source ./env/Scripts/activate
```

Install a python package from a repo subdirectory
```
which pip

pip install -r requirements.txt

python setup.py install
    OR
pip install -e "git+https://github.com/mfarazahmad/CabbageSoup.co.git@master#egg=cspycore&subdirectory=lib-cspycore"
```