'use strict';

const browser = require('../../lib/browser');
const stylint = require('../../lib');
const { caseConfig, caseCode, prepForSnapshot } = require('../systemTestUtils');

const CASE_NUMBER = '001';

describe('lint string', () => {
	let browserResult;
	let stylintResult;

	beforeAll(async () => {
		const code = await caseCode(CASE_NUMBER);
		const config = await caseConfig(CASE_NUMBER);

		stylintResult = prepForSnapshot(await stylint.lint({ code, config }));
		browserResult = prepForSnapshot(await browser.lint({ code, config }));
	});

	it('no-fs - valid sanitize.css and their config', async () => {
		expect(stylintResult).toMatchSnapshot();
	}, 10000);

	it('browser - valid sanitize.css and their config', async () => {
		expect(browserResult).toMatchSnapshot();
	}, 10000);

	it('no-fs and browser assertions produce equal results', async () => {
		expect(browserResult).toEqual(stylintResult);
	}, 10000);
});
