import React from 'react';
import PropTypes from 'prop-types';
import ReactSVG from './react-svg2';

function noop() {}

export default class SvgLoader extends React.Component {
  constructor(props) {
    super(props);
    this.mounted = false;
    this.state = {
      svg: null,
    };

    this.onSVGReady = this.onSVGReady.bind(this);
    if (React.Fragment == null) {
      throw new Error(
        "This version of React doesn't support Fragments, please update it"
      );
    }

    this.onSVGReady = this.onSVGReady.bind(this);
  }

  getChildContext() {
    return {
      svg: this.state.svg,
    };
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  onSVGReady(svgNode) {
    // Run after component has mounted
    setTimeout(() => {
      if (this.mounted) {
        this.setState({ ...this.state, svg: svgNode });
        this.props.onSVGReady(svgNode);
      }
    }, 0);
  }

  render() {
    const { path, onSVGReady, children, svgXML, ...rest } = this.props;
    const renderProxies = this.state.svg != null;
    const proxies = renderProxies ? this.props.children : null;
    return (
      <React.Fragment>
        <ReactSVG
          path={path}
          callback={this.onSVGReady}
          svgXML={svgXML}
          {...rest}
        />
        {proxies}
      </React.Fragment>
    );
  }
}

SvgLoader.childContextTypes = {
  svg: PropTypes.object,
};

SvgLoader.propTypes = {
  path: PropTypes.string,
  svgXML: PropTypes.string,
  onSVGReady: PropTypes.func,
  style: PropTypes.object, // eslint-disable-line
  children: PropTypes.any, // eslint-disable-line
};

SvgLoader.defaultProps = {
  path: null,
  svgXML: null,
  onSVGReady: noop,
  style: null,
};
