from setuptools import find_packages, setup

NAME = "cspycore"
VERSION = "1.0.0"
REQUIRES = ["pymongo==4.1.1", "Flask==2.1.2"]

setup(
    name=NAME,
    version=VERSION,
    author='Faraz',
    license='MIT',
    description='Demo Core Libary',
    url='https://github.com/mfarazahmad/CabbageSoup.co',
    keywords=["cspycore"],
    install_requires=REQUIRES,
    packages=find_packages(),
    include_package_data=True,
)