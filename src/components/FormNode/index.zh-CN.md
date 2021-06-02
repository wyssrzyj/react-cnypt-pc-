---
nav:
  title: 组件
  path: /components
---

## Form-node

#### 组件目的

简化 Form 表单中的操作 将三元操作抽离出来
在 Form 表单中遍历循环生成节点信息的时候可能会这样

```
<FromItem
  key={item.name}
  name={item.name}
  label={item.label}
  rules={[{ required: item.required, message: item.message }]}
  getValueFromEvent={(event: InputEvent) => getValueFromEvent(event, item.type)}
>
  {item.type === 'text' ? (
    <Input placeholder={item.placeholder}></Input>
  ) : item.type === 'switch' ? (
    <FormSwitch></FormSwitch>
  ) : item.type === 'textarea' ? (
    <TextArea placeholder={item.placeholder}></TextArea>
  ) : item.type === 'tree' ? (
    <TreeSelect
      allowClear
      treeData={treeData}
      treeCheckable
      showCheckedStrategy={SHOW_PARENT}
      placeholder={item.placeholder}
    />
  ) : null}
</FromItem>
```

#### 使用

```
import React from 'react';
import { FormNode } from 'dumi-components';
const props = {};
<FormNode {...props} />;
```

Demo:

```tsx
/**
 * title: 文本框
 * desc: From表单中的文本框
 */

import React from 'react';
import { FormNode } from 'dumi-components';

const props = {
  type: 'text',
  placeholder: '请输入密码',
};

export default () => <FormNode {...props} />;
```

```tsx
/**
 * title: 禁用文本框
 * desc: From表单中禁用的文本框
 */

import React from 'react';
import { FormNode } from 'dumi-components';

const props = {
  type: 'text',
  placeholder: '张三',
  disabled: true,
};

export default () => <FormNode {...props} />;
```

```tsx
/**
 * title: 禁用文本框
 * desc: From表单中禁用的文本框
 */

import React from 'react';
import { FormNode } from 'dumi-components';

const props = {
  type: 'text',
  placeholder: '张三',
  disabled: true,
};

export default () => <FormNode {...props} />;
```

```tsx
/**
 * title: textarea
 * desc: From表单中的textarea
 */

import React from 'react';
import { FormNode } from 'dumi-components';

const props = {
  type: 'textarea',
};

export default () => <FormNode {...props} />;
```

```tsx
/**
 * title: checkbox
 * desc: From表单中的checkbox
 */

import React from 'react';
import { FormNode } from 'dumi-components';

const props = {
  type: 'checkbox',
  options: [
    { label: '香蕉', value: 'banana' },
    { label: '苹果', value: 'apple' },
    { label: '梨', value: 'pear' },
  ],
};

export default () => <FormNode {...props} />;
```

```tsx
/**
 * title: select
 * desc: From表单中的select
 */

import React from 'react';
import { FormNode } from 'dumi-components';

const props = {
  type: 'select',
  placeholder: '请选择',
  options: [
    { label: '香蕉', value: 'banana' },
    { label: '苹果', value: 'apple' },
    { label: '梨', value: 'pear' },
  ],
};

export default () => <FormNode {...props} />;
```

```tsx
/**
 * title: select
 * desc: From表单中的select
 */

import React from 'react';
import { FormNode } from 'dumi-components';

const props = {
  type: 'multipleSelect',
  placeholder: '请选择',
  options: [
    { label: '香蕉', value: 'banana' },
    { label: '苹果', value: 'apple' },
    { label: '梨', value: 'pear' },
  ],
};

export default () => <FormNode {...props} />;
```

```tsx
/**
 * title: TreeSelect
 * desc: From表单中的TreeSelect
 */

import React from 'react';
import { FormNode } from 'dumi-components';

const treeData = [
  {
    title: '系统管理',
    value: '0-0',
    key: '0-0',
    children: [
      {
        title: '用户管理',
        value: '0-0-0',
        key: '0-0-0',
        children: [
          {
            title: '用户查询',
            value: '0-0-0-0',
            key: '0-0-0-0',
          },
          {
            title: '用户新增',
            value: '0-0-0-1',
            key: '0-0-0-1',
          },
          {
            title: '用户修改',
            value: '0-0-0-2',
            key: '0-0-0-2',
          },
          {
            title: '用户删除',
            value: '0-0-0-3',
            key: '0-0-0-3',
          },
        ],
      },
      {
        title: '角色管理',
        value: '0-0-1',
        key: '0-0-1',
      },
      {
        title: '菜单管理',
        value: '0-0-2',
        key: '0-0-2',
      },
      {
        title: '部门管理',
        value: '0-0-3',
        key: '0-0-3',
      },
      {
        title: '岗位管理',
        value: '0-0-4',
        key: '0-0-4',
      },
      {
        title: '字典管理',
        value: '0-0-5',
        key: '0-0-5',
      },
      {
        title: '参数管理',
        value: '0-0-6',
        key: '0-0-6',
      },
    ],
  },
];

const props = {
  type: 'tree',
  placeholder: '请选择',
  treeData: treeData,
};

export default () => <FormNode {...props} />;
```

```tsx
/**
 * title: select
 * desc: From表单中的select
 */

import React from 'react';
import { FormNode } from 'dumi-components';

const props = {
  type: 'switch',
};

export default () => <FormNode {...props} />;
```

<API src="/index.tsx"></API>
