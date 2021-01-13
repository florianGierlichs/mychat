import styled from '@emotion/styled';

interface InputSizes {
    [key: string]: { padding: string };
}

interface InputProps {
    size: string;
}

const inputSizes: InputSizes = {
    large: { padding: '12px' },
    small: { padding: '4px' },
};

const getInputPadding = (size = 'small'): string => {
    return inputSizes[size].padding;
};

const Input = styled.input<InputProps>`
    width: -webkit-fill-available;
    padding: ${(props) => getInputPadding(props.size)};
`;

export default Input;
