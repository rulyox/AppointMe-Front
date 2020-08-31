import { useMemo } from 'react';
import { createPortal } from 'react-dom';

const Portal = ({ elementId, children }) => {

    const rootElement = useMemo(() => document.getElementById(elementId), [elementId]);

    return createPortal(children, rootElement);

};

export default Portal;
