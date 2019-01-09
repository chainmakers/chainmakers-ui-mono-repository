## CSS Naming Convention

BEM (which stands for Block-Element-Modifier) is a naming convention standard for CSS class names. It has fairly wide adoption and is immensely useful in writing CSS that is easier to read, understand, and scale.

### Why BEM

BEM naming provides three specific benefits:

- It communicates purpose or function

- It communicates component structure

- It sets a consistent low-level of specificity for styling selectors

### How It Works

A BEM class name includes up to three parts.

- Block: The outermost parent element of the component is defined as the block.

- Element: Inside of the component may be one or more children called elements.

- Modifier: Either a block or element may have a variation signified by a modifier.

If all three are used in a name it would look something like this:

```
[block]__[element]--[modifier]
```

After that brief introduction, let’s look at some specific examples.

### Examples

#### Component With No Elements or Modifiers

Simple components may only employ a single element and thus a single class which would be the block.

```
<button class=”btn”></button>

<style>
  .btn {}
</style>
```

#### Component With A Modifier

A component may have a variation. The variation should be implemented with a modifier class.

```
<!-- DO THIS -->
<button class="btn btn--secondary"></button>

<style>
  .btn {
    display: inline-block;
    color: blue;
  }
  .btn--secondary {
    color: green;
  }
</style>
```

Don’t use the modifier class by itself. The modifier class is intended to augment, not replace, the base class.

```
<!-- DON'T DO THIS -->
<button class="btn--secondary"></button>

<style>
  .btn--secondary {
    display: inline-block;
    color: green;
  }
</style>
```

#### Component With Elements

More complex components will have child elements. Each child element that needs styled should include a named class.

One of the purposes behind BEM is to keep specificity low and consistent. Don’t omit class names from the child elements in your HTML. That will force you to use a selector with increased specificity to style those bare elements inside the component (see img and figcaption elements below). Leaving those classes off may be more succinct, but you will increase risks of cascade issues in the future. One goal of BEM is for most selectors to use just a single class name.

```
<!-- DO THIS -->
<figure class="photo">
  <img class="photo__img" src="me.jpg">
  <figcaption class="photo__caption">Look at me!</figcaption>
</figure>

<style>
  .photo { } /* Specificity of 10 */
  .photo__img { } /* Specificity of 10 */
  .photo__caption { } /* Specificity of 10 */
</style>
```

```
<!-- DON'T DO THIS -->
<figure class="photo">
  <img src="me.jpg">
  <figcaption>Look at me!</figcaption>
</figure>

<style>
  .photo { } /* Specificity of 10 */
  .photo img { } /* Specificity of 11 */
  .photo figcaption { } /* Specificity of 11 */
</style>
```

If your component has child elements several levels deep, don’t try to represent each level in the class name. BEM is not intended to communicate structural depth. A BEM class name representing a child element in the component should only include the base/block name and the one element name. In the examples below, note that photo**caption**quote is an incorrect usage of BEM, while photo\_\_quote is more appropriate.

```
<!-- DO THIS -->
<figure class="photo">
  <img class="photo__img" src="me.jpg">
  <figcaption class="photo__caption">
    <blockquote class="photo__quote">
      Look at me!
    </blockquote>
  </figcaption>
</figure>

<style>
  .photo { }
  .photo__img { }
  .photo__caption { }
  .photo__quote { }
</style>
```

```
<!-- DON'T DO THIS -->
<figure class="photo">
  <img class="photo__img" src="me.jpg">
  <figcaption class="photo__caption">
    <blockquote class="photo__caption__quote"> <!-- never include more than one child element in a class name -->
      Look at me!
    </blockquote>
  </figcaption>
</figure>

<style>
  .photo { }
  .photo__img { }
  .photo__caption { }
  .photo__caption__quote { }
</style>
```

#### Element With Modifier

In some cases, you may want to vary a single element in a component. In those cases add a modifier to the element instead of the component. I’ve found that modifying elements is much less common and less useful than modifying entire components.

```
<figure class="photo">
  <img class="photo__img photo__img--framed" src="me.jpg">
  <figcaption class="photo__caption photo__caption--large">Look at me!</figcaption>
</figure>

<style>
  .photo__img--framed {
    /* incremental style changes */
  }
  .photo__caption--large {
    /* incremental style changes */
  }
</style>
```

#### Style Elements Based on the Component Modifier

If you find yourself consistently modifying elements of the same component together in the same way, then consider adding the modifier to the base of the component and adjusting styles for each child element based on that one modifier. This will increase specificity, but it makes modifying your component much simpler.

```
<!-- DO THIS -->
<figure class="photo photo--highlighted">
  <img class="photo__img" src="me.jpg">
  <figcaption class="photo__caption">Look at me!</figcaption>
</figure>

<style>
  .photo--highlighted .photo__img { }
  .photo--highlighted .photo__caption { }
</style>
```

```
<!-- DON'T DO THIS -->
<figure class="photo">
  <img class="photo__img photo__img--highlighted" src="me.jpg">
  <figcaption class="photo__caption photo__caption--highlighted">Look at me!</figcaption>
</figure>

<style>
  .photo__img--highlighted { }
  .photo__caption--highlighted { }
</style>
```

#### Multi-word Names

BEM names intentionally use double underscores and double hyphens instead of single to separate Block-Element-Modifier. The reason is so that single hyphens can be used as word separators. Class names should be very readable, so abbreviation isn’t always desirable unless the abbreviations are universally recognizable.

```
<!-- DO THIS -->
<div class="some-thesis some-thesis--fast-read">
  <div class="some-thesis__some-element"></div>
</div>

<style>
  .some-thesis { }
  .some-thesis--fast-read { }
  .some-thesis__some-element { }
</style>
```

```
<!-- DON'T DO THIS -->
// These class names are harder to read
<div class="somethesis somethesis--fastread">
  <div class="somethesis__someelement"></div>
</div>

<style>
  .somethesis { }
  .somethesis--fastread { }
  .somethesis__someelement { }
</style>
```

#### BEM Will Make You Happy

If you are not using BEM currently, I would highly recommend using it on your next project. It may be different than what you’re used to, but I’m convinced you’ll quickly see the benefits it provides on projects both large and small. And, hopefully, these examples will help you to avoid some of the common mistakes made by most of us when first diving into this quirky naming convention.

## Links

- https://seesparkbox.com/foundry/bem_by_example
