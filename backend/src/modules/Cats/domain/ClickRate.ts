import { Result } from '../../../shared/core/Result';
import { ValueObject } from '../../../shared/domain/ValueObject';

interface ClickRateProps {
    click_rate: number;
}

export class ClickRate extends ValueObject<ClickRateProps> {
    private constructor(props: ClickRateProps) {
        super(props);
    }

    public static create(props: ClickRateProps): Result<ClickRate> {
        if (props.click_rate < 0) {
            return Result.fail<ClickRate>('ClickRate must be greater than 0');
        }

        return Result.ok<ClickRate>(new ClickRate(props));
    }
}
