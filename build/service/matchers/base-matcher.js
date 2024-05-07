"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const compareImages_1 = __importDefault(require("resemblejs/compareImages"));
const config_1 = require("../../config");
const utils_1 = require("../../utils");
class Matcher {
    constructor() {
        this.config = config_1.Config.get();
    }
    get outputOptions() {
        const { largeImageThreshold } = this.config;
        return { largeImageThreshold };
    }
    match(name) {
        return __awaiter(this, void 0, void 0, function* () {
            let expectedImage = utils_1.getImage(name, config_1.Subfolder.EXPECTED);
            const actualImage = yield this.takeScreenshot();
            if (!expectedImage) {
                utils_1.saveImage(name, config_1.Subfolder.EXPECTED, actualImage);
                expectedImage = actualImage;
            }
            const result = yield compareImages_1.default(expectedImage, actualImage, { output: this.outputOptions });
            const data = result.getBuffer();
            const mismatch = parseFloat(result.misMatchPercentage);
            if (mismatch > 0) {
                utils_1.saveImage(name, config_1.Subfolder.DIFF, data);
            }
            utils_1.saveImage(name, config_1.Subfolder.ACTUAL, actualImage);
            return mismatch;
        });
    }
}
exports.Matcher = Matcher;
