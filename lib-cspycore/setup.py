import setuptools

NAME = "cspycore"
AUTHOR = "mfarazahmad"
VERSION = "1.0.0"
LICENSE = 'MIT'
REQUIRES = [
            "pymongo==4.1.1", 
            "Flask==2.1.2",
            "dnspython==2.2.1",
            "certifi==2021.10.8",
            ]

if __name__ == "__main__":
    setuptools.setup(
        name=NAME,
        version=VERSION,
        author=AUTHOR,
        license=LICENSE,

        description='Demo Core Libary',
        url='https://github.com/mfarazahmad/CabbageSoup.co',
        keywords=["cspycore"],

        install_requires=REQUIRES,
        packages=setuptools.find_packages(),

        zip_safe=True,
        include_package_data=True,
    )