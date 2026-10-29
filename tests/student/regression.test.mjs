import test from 'node:test';
import assert from 'node:assert/strict';
import { getClaim } from '../../src/claims.mjs';

const claimB = { id: 'claim-B', ownerId: 'user-42', status: 'pending' };

test('viewer user-4 does not receive claim-B owned by user-42 (prefix match)', () => {
  assert.equal(getClaim([claimB], 'user-4', 'claim-B'), null);
});

test('exact owner user-42 still receives claim-B', () => {
  assert.deepEqual(getClaim([claimB], 'user-42', 'claim-B'), claimB);
});

test('empty viewer id does not match any owner', () => {
  assert.equal(getClaim([claimB], '', 'claim-B'), null);
});

test('surrounding whitespace is trimmed on viewer and claim ids', () => {
  assert.deepEqual(getClaim([claimB], '  user-42 ', ' claim-B  '), claimB);
});
