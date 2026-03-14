# i18n

A simple 50 LOC I18n library that only depends on react

## usage

### Defining the context
```
    <I18nContext.Provider value={{
      setLocale,
      locale
    }}>
    </I18nContext.Provider>
```

### Translating

```
const t = useTranslate();

const translated = t('hello') //hola
```
or
```
const t = useTranslate();
<div>
{t('hello')}
</div>
```

```
const t = useTranslate();
<div>
{t('nested view.nested translation')}
</div>
```


### Managing the state

It is left up to the consumer of the library how to do it, as long as the context receives a function to set the locale and the locale data, the following would load the json statically and use react's useState for managing it
```
import enLocale from '../public/en.locale.json';

const [locale, setLocale]= useState(enLocale);

<I18nContext.Provider value={{
    setLocale,
    locale
}}>
</I18nContext.Provider>
```

### example translation json

```
{
  "hello": "hola"
  "nested view": {
    "nested translation": "..."
  }
}
```