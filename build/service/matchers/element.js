"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
exports.ElementMatcher = void 0;
const canvas_1 = require("canvas");
const internal_1 = require("../../internal");
const BASE64_PREFIX = 'data:image/png;base64,';
let ElementMatcher = class ElementMatcher {
    constructor(element) {
        this.element = element;
    }
    takeScreenshot() {
        return __awaiter(this, void 0, void 0, function* () {
            const { x, y, width, height } = yield this.getElementRect();
            const scrollTop = yield internal_1.getScrollTop();
            // scroll to element
            yield internal_1.scrollTo(y);
            const base64 = yield browser.takeScreenshot();
            const image = yield canvas_1.loadImage(BASE64_PREFIX + base64);
            const canvas = canvas_1.createCanvas(width, height);
            const context = canvas.getContext('2d');
            context.drawImage(image, x, y - scrollTop, width, height, 0, 0, width, height);
            // restore scroll
            yield internal_1.scrollTo(scrollTop);
            return canvas.toBuffer();
        });
    }
    getElementRect() {
        return __awaiter(this, void 0, void 0, function* () {
            const { x, y } = yield this.element.getLocation();
            const { width, height } = yield this.element.getSize();
            return { x, y, width, height };
        });
    }
};
ElementMatcher = __decorate([
    internal_1.defineMatcher({ name: 'matchElement' }),
    __metadata("design:paramtypes", [Object])
], ElementMatcher);
exports.ElementMatcher = ElementMatcher;
