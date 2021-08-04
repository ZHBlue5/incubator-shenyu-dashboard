/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { PureComponent } from 'react';
import { Dropdown, Icon, Menu } from 'antd';
import styles from './index.less';
import { getIntlContent, getCurrentLocale } from '../../utils/IntlUtils'
import { emit } from '../../utils/emit';

const TranslationOutlinedSvg = () => <svg viewBox="64 64 896 896" focusable="false" data-icon="translation" width="1em" height="1em" fill="currentColor" aria-hidden="true"><defs><style /></defs><path d="M140 188h584v164h76V144c0-17.7-14.3-32-32-32H96c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h544v-76H140V188z" /><path d="M414.3 256h-60.6c-3.4 0-6.4 2.2-7.6 5.4L219 629.4c-.3.8-.4 1.7-.4 2.6 0 4.4 3.6 8 8 8h55.1c3.4 0 6.4-2.2 7.6-5.4L322 540h196.2L422 261.4a8.42 8.42 0 00-7.7-5.4zm12.4 228h-85.5L384 360.2 426.7 484zM936 528H800v-93c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v93H592c-13.3 0-24 10.7-24 24v176c0 13.3 10.7 24 24 24h136v152c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V752h136c13.3 0 24-10.7 24-24V552c0-13.3-10.7-24-24-24zM728 680h-88v-80h88v80zm160 0h-88v-80h88v80z" /></svg>
const TranslationOutlined = props => <Icon component={TranslationOutlinedSvg} {...props} />;

export default class GlobalHeader extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      menu: (
        <Menu onClick={this.handleLocalesValueChange}>
          <Menu.Item key='0'>
            <span>English</span>
          </Menu.Item>
          <Menu.Item key='1'>
            <span>中文</span>
          </Menu.Item>
        </Menu>
      ),
      localeName: window.sessionStorage.getItem('locale') ? window.sessionStorage.getItem('locale') : 'zh-CN',
      userName: window.sessionStorage.getItem('userName')
    }
  }

  handleLocalesValueChange = value => {
    const { changeLocalName } = this.props;
    if (value.key === '0') {
      emit.emit('change_language', 'zh-CN');
      window.sessionStorage.setItem('locale', 'zh-CN');
      this.setState({
        localeName: 'zh-CN'
      });
      changeLocalName('zh-CN');
    } else {
      emit.emit('change_language', 'zh-CN');
      window.sessionStorage.setItem('locale', 'zh-CN');
      this.setState({
        localeName: 'zh-CN'
      });
      changeLocalName('zh-CN');
    }
    getCurrentLocale(this.state.localeName);
  }

  render() {
    const { onLogout } = this.props;
    const { userName } = this.state;
    const menu = (
      <Menu>
        <Menu.Item key="0" onClick={onLogout}>
          <Icon type="logout" /> {getIntlContent("SHENYU.GLOBALHEADER.LOGOUT")}
        </Menu.Item>
      </Menu>
    );
    return (
      <div className={styles.header}>
        <Dropdown placement="bottomCenter" overlay={this.state.menu} trigger={['click']}>
          <TranslationOutlined />
        </Dropdown>
        <div className={styles.right}>
          <Dropdown overlay={menu}>
            <span>
              <Icon type="user" />{userName}<Icon type="down" />
            </span>
          </Dropdown>
        </div>
      </div>
    );
  }
}
