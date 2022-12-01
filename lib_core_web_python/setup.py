from setuptools import find_packages, setup

setup(
    name='lib_core_web_python',
    version='0.1.0',
    author='Faraz',
    license='MIT',
    description='Demo Core Libary',
    url='https://github.com/mfarazahmad/CabbageSoup.co/tree/v2.0/lib-core-services',
    packages=find_packages(include=['utils']),
    install_requires=["pymongo==4.1.1", "Flask==2.1.2"],
)