import { getCommitsListUrl } from "./Routes";

test('Replaces route variables', () => {
    expect(getCommitsListUrl('a', 'b')).toBe('/a/b');
});