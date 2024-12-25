const request = require('supertest'); // http requests
const chai = require('chai'); //  assertions
const sinon = require('sinon') // stubs 
const app = require('../app')
const Flowchart = require('../models/flowchart')

const { expect } = chai

describe('POST /api/flowcharts', () => {
    it('should create a new flowchart and return the created flowchart data', async () => {
        const flowchartData = {
            id: 'testchart', //differentiator
            "nodes": [
                { "id": "node1", "label": "Node 1" },
                { "id": "node2", "label": "Node 2" },
                { "id": "node3", "label": "Node 3" }
            ],
            "edges": [
                { "from": "node1", "to": "node2" },
                { "from": "node2", "to": "node3" }
            ]
        };

        //stub
        // const flowchartInstance = new Flowchart(flowchartData)
        const saveStub = sinon.stub(Flowchart.prototype, 'save').resolves(flowchartData);

        // Make the POST request to create a flowchart
        const res = await request(app)
            .post('/api/flowcharts')
            .send(flowchartData)
            .set('Content-Type', 'application/json');

        // Assertions
        expect(res.status).to.equal(201); // Ensure the response status is 201 (Created)
        expect(res.body.message).to.equal('Flowchart created');
        expect(res.body.flowchart.id).to.equal(flowchartData.id); // Ensure the correct flowchart ID is returned
        expect(res.body.flowchart.nodes).to.deep.equal(flowchartData.nodes); // Ensure nodes are correct
        expect(res.body.flowchart.edges).to.deep.equal(flowchartData.edges); // Ensure edges are correct

        // restore db stub
        saveStub.restore();
    });
});