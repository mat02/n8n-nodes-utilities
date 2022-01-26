import { IExecuteFunctions } from 'n8n-core';
import { INodeExecutionData, INodeType, INodeTypeDescription } from 'n8n-workflow';

export class MultipleAttachments implements INodeType {
	description: INodeTypeDescription = {
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
		properties: [
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const binaryData: any = {};
		let item: INodeExecutionData;
		
		for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
			item = items[itemIndex];
			
			if (item.binary) {
				binaryData[`data${itemIndex}`] = item.binary.data;
			}
		}
		let outputItem: INodeExecutionData = {
			json: {
				keys: Object.keys(binaryData).join(',')
			},
			binary: binaryData,
		};
		
		return this.prepareOutputData([outputItem]);
	}
}
