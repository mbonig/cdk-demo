# CDK Demo Repository

Want to see how many lines of Cfn you made?

```shell
find cdk.out -iname '*.template.json' | xargs cat | wc -l
```
3849

Want to see how many lines of .ts you wrote?

```shell
find src -iname '*.ts' | xargs cat | wc -l
```

175