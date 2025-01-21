"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TempSignupDataService = void 0;
const common_1 = require("@nestjs/common");
let TempSignupDataService = class TempSignupDataService {
    constructor() {
        this.tempDataStore = {};
    }
    set(email, data) {
        this.tempDataStore[email] = data;
    }
    get(email) {
        return this.tempDataStore[email];
    }
    delete(email) {
        delete this.tempDataStore[email];
    }
};
exports.TempSignupDataService = TempSignupDataService;
exports.TempSignupDataService = TempSignupDataService = __decorate([
    (0, common_1.Injectable)()
], TempSignupDataService);
//# sourceMappingURL=temp-signup-data.service.js.map