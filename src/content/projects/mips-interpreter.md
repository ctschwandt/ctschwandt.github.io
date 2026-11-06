---
title: MIPS Assembly Interpreter
summary: A MIPS32 interpreter with a custom lexer and parser, instruction encoding, simulated memory,
  and an interactive REPL.
technologies:
- C++
order: 20
featured: true
github: https://github.com/ctschwandt/MIPS-Assembly-Interpreter
images:
- src: /images/projects/mips1.png
  alt: MIPS Interpreter preview
---

## Overview

A MIPS32 interpreter with a custom lexer and parser, instruction encoding, simulated memory, and an interactive REPL.

## Implementation

- Independently developed a MIPS32 assembly interpreter supporting arithmetic, memory access, labels, and control-flow instructions, and a simulated register file and memory model.
- Built a DFA-based lexer and custom parser to tokenize MIPS assembly, expand pseudo-instructions, and encode instructions into 32-bit MIPS machine code.
- Implemented file-based execution and an interactive REPL with live register and data segment inspection.
