# Documentation Standards & Structure

## Directory Structure

All BMAD-generated artifacts must be organized under the `/bmad-docs` directory with the following structure:

```
bmad-docs/
├── ai-prompts/          # AI-related prompt artifacts and templates
├── architecture/        # System and technical architecture documents
│   ├── system/
│   ├── frontend/
│   └── backend/
├── requirements/        # Product requirements and specifications
│   ├── prd/            # Product Requirements Documents
│   └── user-stories/
├── design/              # Design specifications
│   ├── ui-ux/
│   └── wireframes/
├── api/                 # API documentation
├── guides/              # Development and contribution guides
└── references/          # Reference materials and resources
```

## Naming Conventions

- Use kebab-case for all filenames (e.g., `frontend-architecture.md`)
- Include version numbers for major documents (e.g., `prd-v1.md`, `prd-v2.md`)
- Use descriptive, concise names that clearly indicate the document's purpose
- Add a date in YYYY-MM-DD format for time-sensitive documents

## Document Standards

1. **Version Control**:
   - Maintain version history at the top of each document
   - Use semantic versioning (MAJOR.MINOR.PATCH) for significant updates

2. **Templates**:
   - Use the appropriate BMAD template for each document type
   - Include document metadata (owner, last updated, status)

3. **Cross-Referencing**:
   - Use relative paths when referencing other documents within `/bmad-docs`
   - Maintain a `README.md` in each directory explaining its contents

4. **Formatting**:
   - Use Markdown for all documentation
   - Follow consistent heading hierarchy
   - Include tables of contents for documents longer than 2 pages

## Maintenance

- Review and update documentation during each sprint
- Archive outdated documents in a `/archive` subdirectory
- Keep document history using Git for significant changes
