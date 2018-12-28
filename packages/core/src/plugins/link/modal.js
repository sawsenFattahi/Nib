import React, { PureComponent } from "react";
import styled from "@emotion/styled";
import { TextSelection } from "prosemirror-state";
import { Link, Input, Modal } from "nib-ui";
import { linkPluginKey } from "./plugins";
import { Color } from "../../common/style_constants";

class LinkEditModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      href: "",
      isMouseDown: false
    };
  }

  updateHref = evt => {
    this.setState({
      href: evt.target.value
    });
  };

  getLink = () => {
    const { view: { state: editorState } = {} } = this.props;
    if (!editorState) return;
    const pluginState = linkPluginKey.getState(editorState);
    return pluginState && pluginState.link;
  };

  getActiveLinkMark = () => {
    const { view } = this.props;
    if (!view) return;
    const link = this.getLink();
    if (!link) return;
    return view.domAtPos(link.from).node.querySelector("a");
  };

  unLink = () => {
    const link = this.getLink();
    const {
      view: { state, dispatch }
    } = this.props;
    dispatch(
      state.tr
        .removeMark(link.from, link.to, state.schema.marks.link)
        .addMark(
          link.from,
          link.to,
          state.schema.marks.link.create({ href: this.state.href })
        )
        .setSelection(new TextSelection(state.doc.resolve(link.to)))
    );
  };

  unLink = () => {
    const link = this.getLink();
    const { view } = this.props;
    const { state, dispatch } = view;
    dispatch(state.tr.removeMark(link.from, link.to, state.schema.marks.link));
    view.focus();
  };

  render() {
    const link = this.getLink();
    if (!link) return null;
    return (
      <Modal marker={this.getActiveLinkMark()}>
        <LinkPopup>
          <label htmlFor="href">Href</label>
          <Input
            name="href"
            onChange={this.updateHref}
            defaultValue={link.href}
          />
          <Link onClick={this.updateLink}>Apply</Link>
          <Link onClick={this.unLink}>Unlink</Link>
        </LinkPopup>
      </Modal>
    );
  }
}

export default LinkEditModal;

const LinkPopup = styled.div`
  align-items: center;
  background: white;
  border-radius: 4px;
  border: 1px solid ${Color.border};
  display: flex;
  padding: 5px 10px;
  position: absolute;
  font-size: 14px;
`;
