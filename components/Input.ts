import styled from '@emotion/styled';

interface InputSizes {
    [key: string]: { padding: string };
}

interface InputProps {
    fieldSize: string;
}

const inputSizes: InputSizes = {
    large: { padding: '12px' },
    small: { padding: '4px' },
};

const getInputPadding = (fieldSize = 'small'): string => {
    return inputSizes[fieldSize].padding;
};

const Input = styled.input<InputProps>`
    width: -webkit-fill-available;
    padding: ${(props) => getInputPadding(props.fieldSize)};
`;

export default Input;
