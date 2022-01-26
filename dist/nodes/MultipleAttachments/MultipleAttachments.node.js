"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultipleAttachments = void 0;
class MultipleAttachments {
    constructor() {
        this.description = {
            displayName: 'Multiple Attachments',
            name: 'multipleAttachments',
            group: ['transform'],
            version: 1,
            description: 'Node combines multiple binary items into multi attachment package for Mail node. Remember to set the Attachments property on Mail node to expression {{$json["keys"]}} !',
            defaults: {
                name: 'Multiple Attachments',
                color: '#772244',
            },
            inputs: ['main'],
            outputs: ['main'],
            properties: [],
        };
    }
    async execute() {
        const items = this.getInputData();
        const binaryData = {};
        let item;
        for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
            item = items[itemIndex];
            if (item.binary) {
                binaryData[`data${itemIndex}`] = item.binary.data;
            }
        }
        let outputItem = {
            json: {
                keys: Object.keys(binaryData).join(',')
            },
            binary: binaryData,
        };
        return this.prepareOutputData([outputItem]);
    }
}
exports.MultipleAttachments = MultipleAttachments;
//# sourceMappingURL=MultipleAttachments.node.js.map