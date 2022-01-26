"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MergeData = void 0;
class MergeData {
    constructor() {
        this.description = {
            displayName: 'Merge Data',
            name: 'mergeData',
            icon: 'file:Merge.svg',
            group: ['transform'],
            version: 1,
            description: 'This node merges output data from several node runs.',
            defaults: {
                name: 'Merge Data',
                color: '#772244',
            },
            inputs: ['main'],
            outputs: ['main'],
            properties: [
                {
                    displayName: 'Source node name',
                    name: 'srcNodeName',
                    type: 'string',
                    default: '',
                    placeholder: 'MyNode1',
                    description: 'Name of the source node.',
                },
                {
                    displayName: 'Output index',
                    name: 'outputIdx',
                    type: 'number',
                    default: 0,
                    description: 'Index of the output.',
                },
                {
                    displayName: 'Skip # runs',
                    name: 'runsToSkip',
                    type: 'number',
                    default: 0,
                    description: 'How many runs to skip.',
                },
                {
                    displayName: '# of runs',
                    name: 'numOfRuns',
                    type: 'number',
                    default: 0,
                    description: 'How many runs to merge (if 0 or less then merge all possible runs).',
                },
            ],
        };
    }
    async execute() {
        const items = this.getInputData();
        const srcNodeName = this.getNodeParameter('srcNodeName', 0);
        const outputIdx = this.getNodeParameter('outputIdx', 0);
        const runsToSkip = this.getNodeParameter('runsToSkip', 0);
        const numOfRuns = this.getNodeParameter('numOfRuns', 0);
        const dataProxy = this.getWorkflowDataProxy(0);
        let returnItems = [];
        let counter = runsToSkip;
        do {
            try {
                const items = dataProxy.$items(srcNodeName, outputIdx, counter);
                returnItems.push(items);
            }
            catch (error) {
                break;
            }
            counter++;
        } while (counter < numOfRuns || numOfRuns === 0);
        returnItems = returnItems.reduce((acc, val) => acc.concat(val), []);
        return this.prepareOutputData(returnItems);
    }
}
exports.MergeData = MergeData;
//# sourceMappingURL=MergeData.node.js.map