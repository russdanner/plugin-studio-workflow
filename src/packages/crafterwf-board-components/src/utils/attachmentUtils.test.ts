import {
  filterValidSandboxPaths,
  isSandboxContentPath,
  isValidContentPath,
  resolveSandboxItemPath
} from './attachmentUtils';

function assert(condition: boolean, message: string): void {
  if (!condition) {
    throw new Error(message);
  }
}

assert(isValidContentPath('/site/website/index.xml'), 'valid content path');
assert(!isValidContentPath('null'), 'reject literal null string');

assert(isSandboxContentPath('/site/website/articles/foo/index.xml'), 'site sandbox path');
assert(isSandboxContentPath('/static-assets/images/logo.png'), 'static asset path');
assert(!isSandboxContentPath('123'), 'reject numeric id');
assert(!isSandboxContentPath('https://example.com/page'), 'reject URL');

assert(
  filterValidSandboxPaths(['/site/a.xml', null, '', '/site/a.xml']).join() === '/site/a.xml',
  'dedupe and filter paths'
);

assert(
  resolveSandboxItemPath({ path: '/site/website/index.xml' }) === '/site/website/index.xml',
  'resolve from path'
);
assert(resolveSandboxItemPath({ id: 123 }) === null, 'ignore numeric id');
assert(resolveSandboxItemPath({ url: 'https://example.com' }) === null, 'ignore bare URL');

console.log('attachmentUtils tests passed');
