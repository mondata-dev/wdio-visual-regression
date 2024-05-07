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
exports.match = void 0;
const compareImages_1 = __importDefault(require("resemblejs/compareImages"));
const internal_1 = require("../../internal");
function match(filename, takeScreenshot) {
    return __awaiter(this, void 0, void 0, function* () {
        const config = internal_1.Config.get();
        const actualImage = yield takeScreenshot();
        let expectedImage = internal_1.getImage(filename, internal_1.Subfolder.EXPECTED);
        internal_1.saveImage(filename, internal_1.Subfolder.ACTUAL, actualImage);
        if (!expectedImage) {
            if (config.initiateExpectedImage) {
                internal_1.saveImage(filename, internal_1.Subfolder.EXPECTED, actualImage);
                expectedImage = actualImage;
            }
            else {
                return Number.POSITIVE_INFINITY;
            }
        }
        const result = yield compareImages_1.default(expectedImage, actualImage, { output: config.ressembleOutput });
        const data = result.getBuffer();
        let mismatch = parseFloat(result.misMatchPercentage);
        if (mismatch > config.allowedMismatch) {
            internal_1.saveImage(filename, internal_1.Subfolder.DIFF, data);
        }
        else {
            mismatch = 0;
        }
        return mismatch;
    });
}
exports.match = match;
