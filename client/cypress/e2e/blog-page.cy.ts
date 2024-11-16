describe("The Blog Content Page", () => {
  beforeEach(() => {
    cy.login("cypresstest@gmail.com", "test123");
  });

  const creator = "cypresstest";
  const title = "Cypress Fortnite";
  const tag = /technology/i;
  const content = "fortnite is awesome game!";

  const updateTitle = "Why people like to play games";
  const updateTag = /lifestyle/i;
  const updateContent = "Because it's fun :)";
  it("should create new blog", () => {
    cy.visit("/");

    cy.get('[data-cy="user-profile"]').click();
    cy.contains(/create blog/i).click();

    cy.url().should("contain", "/blog/create");
    cy.contains(/blog editor/i).should("be.visible");

    // Title
    cy.get("input[name=blog-title]").type(title);

    // Dropdown
    cy.contains(/select tag/i).click();
    // All category
    cy.contains(/technology/i).should("be.visible");
    cy.contains(/lifestyle/i).should("be.visible");
    cy.contains(/travel/i).should("be.visible");
    cy.contains(/business/i).should("be.visible");
    cy.contains(/economy/i).should("be.visible");
    cy.contains(/sports/i).should("be.visible");
    // select
    cy.contains(tag).click();
    cy.contains(tag).should("be.visible");

    // Image
    cy.contains(/add image/i)
      .click()
      .selectFile("cypress/fixtures/images/fortnite.png");
    cy.get('img[alt="Blog Image"]').should("be.visible");

    // Content
    cy.get("div.ql-editor").type(content);

    // Submit
    cy.contains(/create blog post/i).click();

    cy.get('[data-cy="blog-card"]').eq(0).find("h1").should("have.text", title);
    // Go to that created blog
    cy.get('[data-cy="blog-card"]').eq(0).click();
    cy.contains(title).should("be.visible");
    cy.contains(tag).should("be.visible");
    cy.contains(content).should("be.visible");
    cy.get('[data-cy="creator-name"]').should("have.text", creator);

    // edit and delete button should exists
    cy.get('[data-testid="edit-button"]').should("be.visible");
    cy.get('[data-testid="delete-button"]').should("be.visible");
  });

  it("should update blog", () => {
    cy.visit("/");

    cy.get('[data-cy="blog-card"]').eq(0).find("h1").should("have.text", title);
    cy.get('[data-cy="blog-card"]')
      .eq(0)
      .find("span")
      .should("have.text", creator);
    cy.get('[data-cy="blog-card"]').eq(0).click();

    cy.contains(title).should("be.visible");
    cy.get('[data-cy="creator-name"]').should("have.text", creator);
    cy.url().should("contain", "/blog/");

    cy.get('[data-testid="edit-button"]').should("be.visible");

    // Click Edit
    cy.get('[data-testid="edit-button"]').click();
    cy.url().should("contain", "/blog/update/");
    cy.contains(/blog editor/i).should("be.visible");

    // Title
    cy.get("input[name=blog-title]").clear().type(updateTitle);

    // Tag
    cy.contains(tag).click();
    cy.contains(updateTag).click();
    cy.contains(updateTag).should("be.visible");

    // Image
    cy.get('[data-cy="image-input"]')
      .click()
      .selectFile("cypress/fixtures/images/minecraft.jpg");
    cy.get('[data-cy="image-input"]').should("be.visible");

    // Content
    cy.get("div.ql-editor").clear().type(updateContent);

    // Submit
    cy.contains(/update blog post/i).click();

    cy.wait(1000);
    cy.url().should("contain", "/blog/");
    cy.contains(updateTitle).should("be.visible");
    cy.contains(updateContent).should("be.visible");
    cy.contains(updateTag).should("be.visible");

    // Check is it update in the home page
    cy.visit("/");
    cy.get('[data-cy="header"]').should("be.visible");
    cy.get('[data-cy="blog-card"]').should("be.visible");
    cy.get('[data-cy="blog-card"]')
      .eq(0)
      .find("h1")
      .should("have.text", updateTitle);
    cy.get('[data-cy="blog-card"]')
      .eq(0)
      .find("span")
      .should("have.text", creator);
  });

  it("should delete blog", () => {
    cy.visit("/");

    cy.get('[data-cy="blog-card"]')
      .eq(0)
      .find("h1")
      .should("have.text", updateTitle);
    cy.get('[data-cy="blog-card"]')
      .eq(0)
      .find("span")
      .should("have.text", creator);
    cy.get('[data-cy="blog-card"]').eq(0).click();

    cy.contains(updateTitle).should("be.visible");
    cy.get('[data-cy="creator-name"]').should("have.text", creator);
    cy.url().should("contain", "/blog/");

    cy.get('[data-testid="delete-button"]').should("be.visible");

    // Click delete and Cancel
    cy.get('[data-testid="delete-button"]').click();
    cy.get('[data-cy="confirm-delete-text"]').should(
      "have.text",
      "Are you sure?",
    );
    cy.get('[data-cy="cancel-delete-button"]').click();

    cy.contains(updateTitle).should("be.visible");
    cy.contains(updateContent).should("be.visible");

    // Click delete and Confirm
    cy.get('[data-testid="delete-button"]').click();
    cy.get('[data-cy="confirm-delete-text"]').should(
      "have.text",
      "Are you sure?",
    );
    cy.get('[data-cy="confirm-delete-button"]').click();

    cy.contains(/latest post/i).should("be.visible");
    cy.get('[data-cy="header"]').should("be.visible");
    cy.get('[data-cy="blog-card"]').should("be.visible");

    cy.get('[data-cy="blog-card"]').eq(0).click();
    cy.contains(updateTitle).should("not.exist");
    cy.contains(updateContent).should("not.exist");
  });
});
