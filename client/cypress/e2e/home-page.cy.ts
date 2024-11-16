import { advertiseId } from "../../src/global";

describe("The Home Page", () => {
  it("successfully loads", () => {
    cy.visit("/");
    cy.contains(/latest post/i).should("be.visible");
    cy.get('[data-cy="header"]').should("be.visible");
    cy.get('[data-cy="blogs-content"]').should("be.visible");
    cy.get('[data-cy="blog-card"]').should("be.visible");
    cy.get('[data-cy="footer"]').should("be.visible");
  });

  it("should handle search blog correctly", () => {
    cy.visit("/");
    // Get correct blog
    cy.get("input[name=search-input]").type("work-life balance{Enter}");

    cy.get('[data-cy="header"]').should("not.exist");
    cy.contains(/search result/i).should("be.visible");
    cy.get('[data-cy="blog-card"]').should("be.visible");
    cy.contains(
      "Mastering Work-Life Balance: Daily Habits for a Healthier, Happier You",
    ).should("be.visible");

    cy.get("input[name=search-input]")
      .clear()
      .type("unknown title of blog{Enter}");
    cy.get('[data-cy="header"]').should("not.exist");
    cy.contains(/search result/i).should("be.visible");
    cy.contains(/no blog found/i).should("be.visible");
    cy.get('[data-cy="blog-card"]').should("not.exist");

    cy.get("input[name=search-input]").clear().type("{Enter}");
    cy.contains(/latest post/i).should("be.visible");
    cy.get('[data-cy="header"]').should("be.visible");
    cy.get('[data-cy="blog-card"]').should("be.visible");
  });

  it("should go to specific blog content", () => {
    cy.visit("/");
    cy.contains(/how to travel the world/i).click();

    cy.url().should("contain", "/blog/");
    cy.contains(/how to travel the world/i).should("be.visible");
    cy.contains(/Set a Travel Budget/i).should("be.visible");

    // No edit and delete button appear from other people blog
    cy.get('[data-testid="edit-button"]').should("not.exist");
    cy.get('[data-testid="delete-button"]').should("not.exist");
  });

  it("should go to header blog content", () => {
    cy.visit("/");
    cy.get('[data-cy="header-card"]').should("be.visible");
    cy.get('[data-cy="header-card"]').click();

    cy.url().should("contain", `/blog/${advertiseId}`);

    // No edit and delete button appear from other people blog
    cy.get('[data-testid="edit-button"]').should("not.exist");
    cy.get('[data-testid="delete-button"]').should("not.exist");
  });
});
