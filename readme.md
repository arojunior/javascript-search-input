# javascript-search-input

Search for terms in objects and nested objects

**Install**

```sh
yarn add git://github.com/arojunior/javascript-search-input#0.1.0
```

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

The library is framework agnostic, but if you wanna use with **React**, for example:

```javascript
const useFilter = ({ keys, data }) => {
  const [inputText, setInputText] = useState('');
  const myFilter = createFilter(keys);
  const filtered = data.filter(myFilter(inputText));

  return { inputText, setInputText, filtered };
};

const App = () => {
  const { inputText, setInputText, filtered } = useFilter({ 
    keys: ['user.name', 'subject', 'dest.name'],
    data: sampleData,
  });

  return (
    <div className="App">
      <input 
        type="text" 
        value={inputText} 
        onChange={event => setInputText(event.target.value)} 
      />
      {JSON.stringify(filtered)}
    </div>
  );
};
```