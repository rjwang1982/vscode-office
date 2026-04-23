# 🧪 渲染验证测试文档

> 用于每次插件更新后验证 Mermaid 图表和 Emoji 渲染是否正常。
> 编辑模式和预览模式都需要检查。

---

## 1. Mermaid 图表测试

### 1.1 Flowchart

```mermaid
graph TD
    A[开始] --> B{条件判断}
    B -->|是| C[执行操作]
    B -->|否| D[跳过]
    C --> E[结束]
    D --> E
```

### 1.2 Sequence Diagram

```mermaid
sequenceDiagram
    participant U as 用户
    participant S as 服务器
    participant DB as 数据库
    U->>S: 发送请求
    S->>DB: 查询数据
    DB-->>S: 返回结果
    S-->>U: 响应数据
```

### 1.3 Mindmap

```mermaid
mindmap
  root((项目架构))
    前端
      React
      Vue
      TypeScript
    后端
      Node.js
      Python
      Go
    数据库
      MySQL
      Redis
      MongoDB
```

### 1.4 Pie Chart

```mermaid
pie title 技术栈占比
    "Python" : 40
    "JavaScript" : 30
    "Go" : 20
    "Other" : 10
```

### 1.5 Gantt

```mermaid
gantt
    title 项目计划
    dateFormat YYYY-MM-DD
    section 开发
    需求分析     :a1, 2026-01-01, 10d
    编码开发     :a2, after a1, 20d
    section 测试
    单元测试     :b1, after a2, 10d
    集成测试     :b2, after b1, 5d
```

### 1.6 State Diagram

```mermaid
stateDiagram-v2
    [*] --> 待审核
    待审核 --> 已通过: 审核通过
    待审核 --> 已拒绝: 审核拒绝
    已通过 --> 已发布: 发布
    已拒绝 --> [*]
    已发布 --> [*]
```

### 1.7 Subgraph

```mermaid
graph LR
    subgraph 离线阶段
        A[文档加载] --> B[文档切割] --> C[向量化] --> D[入库]
    end
    subgraph 在线阶段
        E[用户提问] --> F[向量检索] --> G[精排] --> H[LLM生成]
    end
    D -.-> F
```

### 1.8 Class Diagram

```mermaid
classDiagram
    class Animal {
        +String name
        +int age
        +makeSound()
    }
    class Dog {
        +fetch()
    }
    class Cat {
        +purr()
    }
    Animal <|-- Dog
    Animal <|-- Cat
```

### 1.9 ER Diagram

```mermaid
erDiagram
    USER ||--o{ ORDER : places
    ORDER ||--|{ LINE_ITEM : contains
    PRODUCT ||--o{ LINE_ITEM : "ordered in"
    USER {
        int id PK
        string name
        string email
    }
    ORDER {
        int id PK
        date created
        string status
    }
```


### 1.10 复杂 Flowchart（含样式）

```mermaid
graph TD
    subgraph 系统架构
        direction TB
        subgraph 前端
            FE1[React App] --> FE2[API Gateway]
        end
        subgraph 后端
            BE1[Auth Service] --> BE2[Business Logic]
            BE2 --> BE3[Data Layer]
        end
        subgraph 存储
            DB1[(PostgreSQL)]
            DB2[(Redis Cache)]
        end
        FE2 --> BE1
        BE3 --> DB1
        BE3 --> DB2
    end

    style 前端 fill:#e3f2fd,stroke:#1565c0
    style 后端 fill:#fff3e0,stroke:#e65100
    style 存储 fill:#e8f5e9,stroke:#2e7d32
```

---

## 2. Emoji 渲染测试

### 2.1 常规 Emoji（Lute 内置）

| Emoji | 名称 | 状态 |
|-------|------|------|
| 📘 | blue book | 应正常 |
| 🔍 | magnifying glass | 应正常 |
| 🔴 | red circle | 应正常 |
| 🚀 | rocket | 应正常 |
| ✅ | check mark | 应正常 |
| ❌ | cross mark | 应正常 |
| 🎉 | tada | 应正常 |
| 👍 | thumbs up | 应正常 |
| ❤️ | heart | 应正常 |
| 🤖 | robot | 应正常 |

### 2.2 几何 Emoji（Unicode 12.0+，通过 PutEmojis 注入）

| Emoji | 名称 | 状态 |
|-------|------|------|
| 🟡 | yellow circle | 需注入 |
| 🟢 | green circle | 需注入 |
| 🟠 | orange circle | 需注入 |
| 🟣 | purple circle | 需注入 |
| 🟤 | brown circle | 需注入 |
| ⬜ | white square | 需注入 |
| ⬛ | black square | 需注入 |
| 🟥 | red square | 需注入 |
| 🟧 | orange square | 需注入 |
| 🟨 | yellow square | 需注入 |
| 🟩 | green square | 需注入 |
| 🟦 | blue square | 需注入 |
| 🟪 | purple square | 需注入 |
| 🟫 | brown square | 需注入 |
| ⭐ | star | 需注入 |
| 💬 | speech balloon | 需注入 |

### 2.3 实际使用场景

| # | 事项 | 优先级 | 状态 |
|---|------|--------|------|
| 1 | 部署新版本 | 🟡 中 | 待执行 |
| 2 | 修复线上 Bug | 🔴 高 | 需检查 |
| 3 | 监控稳定性 | 🟢 低 | 持续观察 |
| 4 | 代码审查 | 🟠 中高 | 进行中 |
| 5 | 文档更新 | 🟣 低 | 已完成 ✅ |

### 2.4 混合 Emoji 段落

🚀 项目启动后，团队分为三组：

- 🟦 **前端组**：负责 React 应用开发，使用 TypeScript 📘
- 🟩 **后端组**：负责 API 和数据库 🔍，确保 ⭐ 级性能
- 🟧 **测试组**：编写自动化测试 🤖，覆盖率目标 > 80%

💬 每日站会 15 分钟，🟥 阻塞问题优先讨论。

---

## 3. 验证清单

- [ ] 编辑模式：所有 Mermaid 图表正常渲染
- [ ] 预览模式：所有 Mermaid 图表正常渲染，无互相串图
- [ ] 编辑模式：常规 Emoji 正常显示
- [ ] 编辑模式：几何 Emoji（🟡🟢🟥等）正常显示
- [ ] 预览模式：所有 Emoji 正常显示
- [ ] Reload 按钮：点击后内容刷新
- [ ] Edit Mode 切换按钮：可在 wysiwyg/ir/sv 间切换
