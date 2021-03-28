import { ValueObject } from '../../../../src/shared/domain/ValueObject';

interface SomeProps {
    value: string;
}

interface OtherProps {
    value: string;
    otherValue: string;
}
class A extends ValueObject<SomeProps> {
    constructor(public props: SomeProps) {
        super(props);
    }
}

class B extends ValueObject<SomeProps> {
    constructor(public props: SomeProps) {
        super(props);
    }
}

class C extends ValueObject<OtherProps> {
    constructor(public props: OtherProps) {
        super(props);
    }
}

describe('ValueObject', () => {
    describe('equals', () => {
        it('returns true if all values are equal', () => {
            const a = new A({ value: 'a' });
            const b = new B({ value: 'a' });

            expect(a.equals(b)).toBe(true);
        });

        it('returns false if a property is not equal', () => {
            const a = new A({ value: 'a' });
            const b = new B({ value: 'b' });

            expect(a.equals(b)).toBe(false);
        });

        it('returns false if a property is not defined on one value object', () => {
            const a = new A({ value: 'a' });
            const c = new C({ value: 'a', otherValue: 'c' });

            expect(a.equals(c)).toBe(false);
        });
    });
});
