# BMAD-METHOD IDE Integration Guide for Windsurf

## Overview

This guide provides detailed, step-by-step instructions to integrate and use the BMAD-METHOD AI Agent Framework within the Windsurf IDE environment.

## What is `ide-bmad-orchestrator.md`?

The `ide-bmad-orchestrator.md` is a special AI agent persona file included in the BMAD-METHOD framework designed to act as a **single, unified interface** to all other specialized personas (agents) within the IDE.

Instead of loading many separate agents for different roles (e.g., Analyst, Product Manager, Architect), you use the orchestrator agent as your primary AI assistant. This orchestrator dynamically loads and embodies the requested persona on demand based on your commands.

### Why use the Orchestrator as your primary interface?

- **Simplicity:** Only one agent needs to be configured and active at a time.
- **Flexibility:** You can switch between personas seamlessly by requesting the orchestrator to "become" a different agent.
- **No Build Step Required:** The orchestrator loads all configurations and persona files dynamically within the IDE.
- **Consistent Interaction:** Maintains clear context by embodying only one persona at a time.

## Step-by-Step Setup and Usage Guide

### 1. Clone or Copy BMAD-METHOD to Your Project

- Clone the BMAD-METHOD repository or copy the `bmad-agent` folder into the root directory of your Windsurf project.

### 2. Configure Windsurf to Use the BMAD Agent

1. **Access Windsurf Settings**:
   - Click on the "Windsurf - Settings" button in the bottom right corner of the IDE
   - Click on "Advanced Settings" (available in the settings panel or from the top right profile dropdown)

2. **Set Up Custom AI Rules**:
   - In Advanced Settings, locate the "Custom AI Rules" or "Agent Configuration" section
   - Create a new custom agent configuration
   - Name it "BMAD Orchestrator" or your preferred name

3. **Configure the Agent**:
   - Open the `bmad-agent/ide-bmad-orchestrator.md` file
   - Copy its entire contents
   - Paste this content into the agent's custom instructions/prompt field
   - Save the configuration

4. **Verify Required Files**:
   - Ensure the following files are present in your project:
     - `bmad-agent/ide-bmad-orchestrator.cfg.md` (main configuration)
     - `bmad-agent/personas/` (contains all persona definitions)
     - `bmad-agent/tasks/` (contains task definitions)
     - `bmad-agent/templates/`, `checklists/`, `data/` (supporting assets)

### 3. Starting the BMAD Agent in Windsurf

1. **Activate the Agent**:
   - Open the chat/assistant panel in Windsurf
   - Select the "BMAD Orchestrator" from your list of available agents
   - The orchestrator will automatically load its configuration file

2. **Initial Setup Verification**:
   - The agent should greet you and indicate it's ready
   - If your initial input is unclear, it will list available personas and their tasks
   - You can verify it's working by asking: "/help" to see available commands

### 5. Selecting and Switching Personas

- To select a persona, type a command or message requesting the orchestrator to "become" a persona by name or title.
- Example command: `/analyst` or `/load-analyst` to become the Analyst persona.
- The orchestrator will load that persona's definition and fully embody it.
- You can switch personas anytime by issuing a similar command.
- If switching while a persona is active, the orchestrator may ask for confirmation to avoid losing context.

### 6. Executing Tasks

- After activating a persona, ask it to perform one of its configured tasks.
- Tasks may be internal ("In Memory") or external markdown files in the `tasks/` folder.
- The persona will load any referenced templates, checklists, or data as needed.

### 7. Useful Commands

- `/help` - List available commands and usage tips.
- `/agent-list` - Show all available personas and their tasks.
- `/tasks` - List tasks available to the current persona.
- `/exit` - Exit current persona and return to base orchestrator.
- `/yolo` - Toggle YOLO mode (less interactive).

### 8. Best Practices

- Use clear commands to switch personas or request tasks.
- Prefer starting a new chat session when switching personas to maintain clean context.
- Customize personas or add new ones by editing the config and persona files.
- Keep the `bmad-agent` folder updated with the latest from the BMAD-METHOD repo.

---

This guide should enable your team to effectively integrate and use the BMAD-METHOD framework within Windsurf IDE, leveraging the power of the orchestrator agent as the central AI interface.

If you need further help or want me to generate example commands or workflows, just ask!
