import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div className="modal">
    <div className="modalInner">
      404 - <Link to="/index.html">Go home</Link>
    </div>
  </div>
);

export default NotFoundPage;
