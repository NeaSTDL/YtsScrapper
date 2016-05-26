# YtsScrapper
An Electron simple scrapper app to understand async calls and responses.

To use this application, you will first need to install NodeJS v=>4.0 and NPM on its latest version.

Then, simply run this instruction to install packages:

    npm install

Having both Node and NPM, install electron-prebuilt package globally:

    sudo npm install -g electron-prebuilt
    
After that, on separate terminals, run these from the root folder of the project:

    node server/index.js
and
    
    electron electron/main.js
    
This will launch both the instance of the node server and the electron application.
