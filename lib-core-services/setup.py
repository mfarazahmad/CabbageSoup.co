from setuptools import find_packages, setup

setup(
    name='lib_core_web_python',
    packages=find_packages(include=['utils']),
    version='0.1.0',
    description='Demo Core Libary',
    install_requires=["pymongo==4.1.1", "Flask==2.1.2"],
    author='Faraz',
    license='MIT',
)