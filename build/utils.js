"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFunction = exports.resolvePath = exports.getImage = exports.saveImage = exports.checkAndCreateFolder = void 0;
const path_1 = require("path");
const fs_1 = require("fs");
const internal_1 = require("./internal");
function checkAndCreateFolder(path) {
    if (!fs_1.existsSync(path)) {
        fs_1.mkdirSync(path);
    }
}
exports.checkAndCreateFolder = checkAndCreateFolder;
function saveImage(name, subfoler, data) {
    const path = resolvePath(name, subfoler);
    fs_1.writeFileSync(path, data);
}
exports.saveImage = saveImage;
function getImage(name, subfoler) {
    const path = resolvePath(name, subfoler);
    return fs_1.existsSync(path) ? fs_1.readFileSync(path) : null;
}
exports.getImage = getImage;
function resolvePath(name, subfolder) {
    const config = internal_1.Config.get();
    return path_1.resolve(config.instanceDir, subfolder, `${name}.png`);
}
exports.resolvePath = resolvePath;
function isFunction(fn) {
    return typeof fn === 'function';
}
exports.isFunction = isFunction;
