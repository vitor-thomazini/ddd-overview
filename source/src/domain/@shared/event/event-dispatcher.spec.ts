import { SendEmailWhenProductIsCreatedHandler } from "../../product/event/handler/send-email-when-product-is-created.handler";
import { ProductCreatedEvent } from "../../product/event/product-created.event";
import { EventDispatcher } from "./event-dispatcher";

describe("Domain events tests", () => {
  it("should register an event handler", () => {
    // Arrange
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    // Act
    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    // Assert
    expect(eventDispatcher.eventHandlers["ProductCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.eventHandlers["ProductCreatedEvent"].length).toBe(1);
    expect(eventDispatcher.eventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
  });

  it("should unregister an event handler", () => {
    // Arrange
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    eventDispatcher.register("ProductCreatedEvent", eventHandler); 

    // Act
    eventDispatcher.unregister("ProductCreatedEvent", eventHandler);

    // Assert
    expect(eventDispatcher.eventHandlers["ProductCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.eventHandlers["ProductCreatedEvent"].length).toBe(0);
  });

  it("should unregister all event handlers", () => {
    // Arrange
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    eventDispatcher.register("ProductCreatedEvent", eventHandler); 

    // Act
    eventDispatcher.unregisterAll();

    // Assert
    expect(eventDispatcher.eventHandlers["ProductCreatedEvent"]).toBeUndefined();
  });

  it("should notify all event handlers", () => {
    // Arrange
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    const productCreatedEvent = new ProductCreatedEvent({
      name: "Product 1",
      description: "Product 1 description",
      price: 10.0
    })

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    // Act
    eventDispatcher.notify(productCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  }); 
});