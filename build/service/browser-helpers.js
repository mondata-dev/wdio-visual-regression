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
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrollTo = exports.getScrollTop = void 0;
function getScrollTop() {
    return browser.execute('return document.documentElement.scrollTop');
}
exports.getScrollTop = getScrollTop;
function scrollTo(position) {
    return __awaiter(this, void 0, void 0, function* () {
        yield browser.execute('window.scrollTo(0, arguments[0])', position);
    });
}
exports.scrollTo = scrollTo;
