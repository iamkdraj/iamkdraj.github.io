# Study Guide Generation for an Indian Writer in English

**Author:** [Author's Name]

**Objective:** To create a comprehensive set of study notes for the specified author, focusing on the requirements of the 2nd Grade English syllabus. The notes should be detailed, well-structured, and optimized for exam preparation.

**Instructions:**

Generate the following files and folders with the specified content for the author. Each file should include YAML frontmatter for `title` and `tags`, and navigation links at the bottom.

---

### File Structure & Content

**1. `00_Biography.md`**
*   **Frontmatter:**
    ```yaml
    ---
    title: "[Author's Name] - Biography"
    tags:
      - indian-writers
      - "[Author's Name]"
    ---
    ```
*   **Content:** A concise biography including dates, place of birth, significant life events, and their overall contribution.
*   **Navigation:**
    ```markdown
    ---
    **Next:** [[01_Works_at_a_Glance]]
    ```

**2. `01_Works_at_a_Glance.md`**
*   **Frontmatter:**
    ```yaml
    ---
    title: "[Author's Name] - Works at a Glance"
    tags:
      - indian-writers
      - "[Author's Name]"
    ---
    ```
*   **Content:** A table of their major works (Title, Genre, Year).
*   **Navigation:**
    ```markdown
    ---
    **Previous:** [[00_Biography]]
    **Next:** [[02_Detailed_Analysis]]
    ```

**3. `Major Works/` (Folder)**
*   Create a subfolder named `Major Works`.
*   Inside, create a separate Markdown file for each major work (e.g., `Gitanjali.md`).
*   **File Frontmatter (for each work):**
    ```yaml
    ---
    title: "[Work Title] - Analysis"
    tags:
      - indian-writers
      - "[Author's Name]"
      - "[Work Title]"
    ---
    ```
*   **File Content (for each work):** A brief plot summary, analysis of major themes, key characters, and literary style.
*   **File Navigation (for each work):**
    ```markdown
    ---
    **Up:** [[02_Detailed_Analysis]]
    ```

**4. `02_Detailed_Analysis.md`**
*   **Frontmatter:**
    ```yaml
    ---
    title: "[Author's Name] - Detailed Analysis of Major Works"
    tags:
      - indian-writers
      - "[Author's Name]"
    ---
    ```
*   **Content:** A list of links to the detailed notes in the `Major Works` folder.
*   **Navigation:**
    ```markdown
    ---
    **Previous:** [[01_Works_at_a_Glance]]
    **Next:** [[03_Themes_and_Style]]
    ```

**5. `03_Themes_and_Style.md`**
*   **Frontmatter:**
    ```yaml
    ---
    title: "[Author's Name] - Themes and Style"
    tags:
      - indian-writers
      - "[Author's Name]"
    ---
    ```
*   **Content:** A summary of recurring themes and unique writing style.
*   **Navigation:**
    ```markdown
    ---
    **Previous:** [[02_Detailed_Analysis]]
    **Next:** [[04_Awards_and_Recognition]]
    ```

**6. `04_Awards_and_Recognition.md`**
*   **Frontmatter:**
    ```yaml
    ---
    title: "[Author's Name] - Awards and Recognition"
    tags:
      - indian-writers
      - "[Author's Name]"
    ---
    ```
*   **Content:** A list of major awards and honors.
*   **Navigation:**
    ```markdown
    ---
    **Previous:** [[03_Themes_and_Style]]
    **Next:** [[05_PYQ_Analysis]]
    ```

**7. `05_PYQ_Analysis.md`**
*   **Frontmatter:**
    ```yaml
    ---
    title: "[Author's Name] - PYQ Analysis"
    tags:
      - indian-writers
      - "[Author's Name]"
    ---
    ```
*   **Content:** An analysis of previous year questions related to the author.
*   **Navigation:**
    ```markdown
    ---
    **Previous:** [[04_Awards_and_Recognition]]
    **Next:** [[06_Quotes]]
    ```

**8. `06_Quotes.md`**
*   **Frontmatter:**
    ```yaml
    ---
    title: "[Author's Name] - Quotes"
    tags:
      - indian-writers
      - "[Author's Name]"
    ---
    ```
*   **Content:** A collection of 5-10 significant quotes.
*   **Navigation:**
    ```markdown
    ---
    **Previous:** [[05_PYQ_Analysis]]
    **Next:** [[07_Miscellaneous]]
    ```

**9. `07_Miscellaneous.md`**
*   **Frontmatter:**
    ```yaml
    ---
    title: "[Author's Name] - Miscellaneous"
    tags:
      - indian-writers
      - "[Author's Name]"
    ---
    ```
*   **Content:** Other relevant information (contemporaries, influence, facts).
*   **Navigation:**
    ```markdown
    ---
    **Previous:** [[06_Quotes]]
    ```

---

**Formatting:**

*   Use Markdown for all files.
*   Use headings, subheadings, and bullet points to structure the information clearly.
*   Use blockquotes for quotes.
*   Use tables for structured data.
*   Use Obsidian-style `[[links]]` for navigation.
