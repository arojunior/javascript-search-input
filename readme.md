# javascript-search-input

Search for terms in objects and nested objects

**Usage**

```javascript
import { createFilter } from 'javascript-search-input';

const sampleData = [{
  id: 1,
  user: {
    name: 'Junior Oliveira',
    job: 'Software Engineer',
  },
  subject: 'Hi!',
  dest: [
    {
      name: 'Bruno',
      job: 'Developer',
    },
    {
      name: 'Helio',
      job: 'Lawyer',
    }
  ]
}, {
  id: 2,
  user: {
    name: 'Fabiano',
    job: 'UX Designer',
  },
  subject: 'javascript',
  dest: [
    {
      name: 'Cordeiro',
      job: 'CEO',
    },
  ]
}];

const KEYS_TO_FILTERS = ['user.name', 'subject', 'dest.name'];
const myFilter = createFilter(KEYS_TO_FILTERS)

const filtered = sampleData.filter(myFilter('Oliveira')); 
// should return the object { ... user: { name: 'Junior Oliveira'} ... }
```