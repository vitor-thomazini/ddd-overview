# DDD - DOMAIN DRIVE DESIGN

> **[Certificado de conclusão do curso - DDD](./assets/certifications/ddd-certification.pdf/)**
> **[Certificado de conclusão do curso - Modelagem com DDD](./assets/certifications/ddd-modeling-certification.pdf)**

## 1 VISÃO GERAL

O DDD é uma forma para desenvolver software com o foco de analisar o negócio de uma empresa e identificar qual o coração do negócio (domínio), quais as partes que auxiliam o negócio (subdomínios) e quais as regras e processos que entrelaçam e compõe estes domínios e subdomínios. Tal metodologia tem como propósito separar o que é complexidade de negócio e o que é complexidade técnica, por isso esta abordagem normalmente é recomendada para software de negócios complexos, com muitos setores com perspectivas diferentes e também regras de negócio diversificadas.

Grande parte da complexidade do software está no entendimento do negócio, e como o DDD tenta dividir a complexidade do negócio em domínios e subdomínios é necessário algumas técnicas sociais para conseguir realizar esta segmentação. Para isso, uma das formas de identificar a fronteira entre domínios e/ou subdomínios é por meio da linguagem, ao qual o DDD denomina de linguagem ubíqua (linguagem universal). Como "regra" pode assumir que a transição da fronteira existe quando a linguagem utilizada pelos stakeholders começa a mudar, por exemplo, para um médico o paciente é o equivalente a um cliente, contudo os médicos não utilizam o termo cliente para se referir a um paciente, já para o setor financeiro (deste mesmo hospital/lugar) utiliza o termo cliente para referir ao paciente, embora estejam falando da mesma pessoa, são contextos diferentes. Logo, podemos concluir que palavras diferentes com mesmo significado é um delimitar de fronteira entre contextos, o mesmo vale para situações em que a mesma palavra com significado diferentes. Estas fronteiras entre contextos é denominado **context bounding** ou contexto delimitador.

## 2 DOMÍNIOS E SUBDOMÍNIOS

O domínio refere-se ao problema principal da empresa e dentro deste podemos localizar o **core domain** que é o coração da empresa, isto é, o diferencial competitivo da empresa. Contudo, para o **core domain** existir muitas vezes é necessário a ajuda de outros setores ou partes da empresa/sistema para fazer com que o **core** funcione, estas partes são denominadas **support subdomains**, ressaltando que estes **subdomains** ainda assim auxilia no diferencial competitivo. Além disso, também existem os **generic subdomains**, ao qual realizam operações auxiliares, mas que não são diferenciais competitivos.

Fazendo uma analogia para explicar contextualizar melhores a definição de domínios, imagine uma que você esta explorando uma floresta e encontra uma caverna (**domain**) e por curiosidade você entra na caverna e descobre que dentro desta caverna tem uma aglomerado de outras cavernas e explorando elas você encontra diamante em uma delas e nas outras encontra água ou uma saída para uma área externa incrível. Após isto, você reúne uma equipe para explorar a caverna interna que contém diamantes (**core domain**) e percebe que é conveniente que existam cavernas com água, por auxiliar os trabalhadores na exploração do diamante e na hidratação (**support subdomains**). Além disso, ao longo do trabalho os operários sempre vão para as outras cavernas com as paisagens incríveis para aproveitar o almoço e descansarem (**generic subdomains**).

## 3 ESPAÇO DO PROBLEMA E ESPAÇO DA SOLUÇÃO

O espaço do problema é uma visão geral do domínio e suas complexidades, junto as delimitações dos subdomínios. Neste momento são coletadas informações para gerar documentações para elaborar a solução.

O espaço da solução consiste em analisar o(s) domínio(s) e criar uma modelagem ou design tático mapeando os agradados, entidades e objetos de valor da aplicação, bem como os eventos de domínio, além de identificar os subdomínios e encontrar os delimitadores de contextos.

Com isto em mãos é possível distinguir a complexidade técnica com a complexidade de negócio e priorizar com mais precisão as partes da aplicação, já que neste momento o processo estaria mapeado em pequenas partes.

## 4 MAPEAMENTO DE CONTEXTO (CONTEXT MAPPING)

Uma coisa importante de ressaltar é que durante a modelagem é importante manter os contextos com suas respectivas responsabilidades e valores em entidades, pois caso dois contextos utilizem uma mesma entidade mas com significado de negócio diferentes, normalmente gera uma confusão durante o processo de manutenção.

Para realizar o mapeamento do contexto, algumas estratégias podem ser utilizadas, sendo elas:

- **Partnership:** Contextos que realizam uma parceria, no qual os assuntos são muito similares e normalmente existem partes que são iguais.

- **Shared Kernel:** Espaço no qual é compartilhado os mesmo códigos/recursos entre contextos, normalmente o shared kernel existe entre contextos "parceiros".

- **Customer-Supplier Development:** São contexto que existe uma comunicação entre eles, sendo um deles o que fornece o recurso (upstream - U) e o outro consome os recursos (downstream - D).

- **Conformist:** Consiste em utilizar um recurso da forma como ele de fato foi documentado, pois nestas casos não seria possível modificar o fornecedor de recursos. Este mapeamento normalmente são situações de consumo de api's ou recursos de terceiros.

- **Anti-Corruption Layer:** Camada no qual monta-se uma "contrato" com sua aplicação para traduzir os termos de terceiros para os termos do contexto de acordo com a linguagem ubíqua do contexto. Esta camada é muito utilizada em situações conformistas. 

- **Open Host Service:** Definir que existe algum protocolo de serviço para acesso ou funcionar.

- **Published Language:** Definir se existe uma linguagem que é necessária para consumir um contexto específico.

- **Separate Ways:** Representação de contextos que não podem se comunicar.

- **Big Ball of Mud:** Sistema com tudo misturado "sem" organização.

A imagem abaixo mostra um exemplo de uma modelagem simples utilizando padrões do DDD

<img src="./assets/ddd-context-mapping.png" width="500"/>

Para mais detalhes existe um repositório no github [DDD-Crew](https://github.com/ddd-crew/context-mapping) que demonstra uma padronização de documentação para a modelagem de contexto.

## 5 MODELAGEM

Ao falarmos de DDD precisamos olhar com mais profundidade um *bounded context* para assim ser possível realizar uma modelagem mais assertiva dos seus principais componentes, comportamentos e individualidades, bem como suas relações. Para realizar o mapeamento de negócio para arquitetura de código, logo, dentro do DDD existem elementos táticos, com o intuito de facilitar este processo, sendo eles: entidades, entidades anêmicas, objetos de valor, agregador, serviços de domínio, repositório, eventos de domínio, módulos e fabricas.

## 5.1 ENTIDADE (ENTITY)

Uma entidade tem como característica ser algo único e possibilitar a alteração ao longo do tempo, isto é, uma entidade deve conter toda a regra de negócio de um determinado contexto junto a um identificador para garantir sua unicidade. Além disso, uma entidade sempre deve representar o estado correto e atual dos dados e para isso ela deve sempre se auto validar, logo, métodos *set* sempre acabam sendo um problema, por modificar os dados sem passar por suas devidas validações. 

As regras de negócio são comportamento realizam alterações nos dados, sendo representada por métodos com nomes expressivos de acordo com o negócio e não simplesmente métodos de *get* e *set*.

Outro ponto a considerar seria que entidade no DDD são diferentes de entidades de ORM, pois ORM é uma complexidade acidental até podemos considerar entidades de ORM como entidades anêmicas, por não conter regras de negócio. Uma recomendação seria modificar as denominações para não causar confusão, por exemplo entidade no DDD serem chamadas de entidades (**entity**) já entidade de ORM ser denominada modelos (**model**).

**EXEMPLO DE ENTIDADES**
- [order](./source/src/domain/checkout/entity/order.ts)           
- [order-item](./source/src/domain/checkout/entity/order-item.ts) 
- [customer](./source/src/domain/customer/entity/customer.ts)     
- [product](./source/src/domain/product/entity/product.ts)        

## 5.2 ENTIDADE ANÊMICA (ANEMIC ENTITY)

Uma entidade anêmica é simplesmente um conjunto de dados sem significado e não contem regras de negócio, normalmente são classes de DTO (data transfer object).

## 5.3 OBJETO DE VALOR (VALUE OBJECT)

São objetos que estão diretamente associados aos atributos de uma entidade, além do fato de não serem únicos e devem ser tratados como imutáveis, por exemplo um endereço pode ser um objeto de valor e quando modificado o número da casa não está sendo modificado o número da perspectiva da entidade mas sim o endereço . Além disso, são objetos que não possui identificador mas mesmo assim devem se auto validar, assim como pode ser adicionado novas formas de retorno de dados para visualização, isto é uma informação com um significado.

**EXEMPLO DE OBJETO DE VALOR**
- [address](./source/src/domain/customer/value-object/address.ts)

## 5.4 AGREGADO (AGGREGATE)

Um agregado é um conjunto de objetos que faz parte de um mesmo objetivo do negócio, isto é, são tratados como uma unidade para propósito de mudança de dados.

**EXEMPLO DE AGREGADOS**
- [order](./source/src/domain/checkout/entity/order.ts)     
- [customer](./source/src/domain/customer/entity/customer.ts)     
- [product](./source/src/domain/product/entity/product.ts)  

## 5.5 SERVIÇO DE DOMÍNIO (DOMAIN SERVICES)

Um serviço de domínio é uma operação sem estado (stateless) que cumpre uma tarefa específica do domínio que não se enquadre em uma entidade ou um objeto de valor. Normalmente, um possível indicador seria quando uma ação afeta mais de uma entidade, por exemplo cálculo de uma informações que deve ser realizada em lote. Além disso, ao criar um serviço de domínio deve definir a interface com base na linguagem ubíqua, assim como o nome da operação desta interface.

Contudo, existem alguns indicadores que podem sinalizar que sua modelagem e/ou concepção do negócio possa estar errada, por exemplo, caso comece a surgir muitos serviços de domínios pode indicar que seus agregados e/ou entidades estão anêmicos.

**EXEMPLO DE SERVIÇOS DE DOMÍNIO**
- [order.service](./source/src/domain/checkout/service/order.service.ts)    
- [product.service](./source/src/domain/product/service/product.service.ts) 

## 5.6 REPOSITÓRIO (REPOSITORY)

Um repositório comumente se refere a um local de armazenamento, geralmente considerado um local de segurança ou preservação de dados. Quando algo é armazenado em um repositório, posteriormente ao recuperar os dados é esperado que os dados estejam no mesmo estado de quando foi armazenado. Além disso, também é o local no qual pode ser feito operações para remover os dados.

Outro ponto a ressaltar é que todo o agregado terá um repositório associado (uma relação um para um).

**EXEMPLO DE REPOSITÓRIOS**
- [product-repository.interface](./source/src/domain/product/repository/product-repository.interface.ts)
- [product.repository](./source/src/infra/product/sequelize/repository/product.repository.ts)
- [customer-repository.interface](./source/src/domain/customer/repository/customer-repository.interface.ts)
- [customer.repository](./source/src/infra/customer/sequelize/repository/customer.repository.ts)
- [order-repository.interface](./source/src/domain/checkout/repository/order-repository.interface.ts)
- [order.repository](./source/src/infra/checkout/sequelize/repository/order.repository.ts)

## 5.7 EVENTOS DE DOMÍNIO (DOMAIN EVENTS)

A essência de uma evento de domínio consiste em capturar coisas que podem desencadear uma mudança no estado da aplicação. Durante estes desencadeamentos é possível adicionar logs de auditoria. Além disso, os eventos de domínio são utilizados para notificar modificações de estados em outros contextos delimitados.

Os eventos de domínio devem ser nomeados com um verbo no passado, para representar uma ação realizada. Já o fluxo de implementação contém alguns componentes que podem auxiliar na implementação, sendo eles:

- Event: Classes que normalmente como base contém uma data e hora para registrar o momento que o evento é executado.
- Handler: Executa o processamento quanto um evento é chamado, podendo existir diversos **handlers** associados a um evento.
- Event Dispatcher: Responsável por armazenar e executar os **handlers** de um evento quando ele for disparado.

**EXEMPLOS DE EVENTOS DE DOMÍNIO**
- [event.interface (Event)](./source/src/domain/@shared/event/event.interface.ts )
- [product-created.event (Event)](./source/src/domain/product/event/product-created.event.ts)
- [event-handler.interface (Handler)](./source/src/domain/@shared/event/event-handler.interface.ts)
- [send-email-when-product-is-created.handler (Handler)](./source/src/domain/product/event/handler/send-email-when-product-is-created.handler.ts)
- [event-dispatcher.interface (Event Dispatcher)](./source/src/domain/@shared/event/event-dispatcher.interface.ts)
- [event-dispatcher (Event Dispatcher)](./source/src/domain/@shared/event/event-dispatcher.ts)
- [ event-dispatcher.spec.ts (Exemplo de uso)](./source/src/domain/@shared/event/event-dispatcher.spec.ts)

## 5.8 MÓDULOS (MODULES)

Os módulos são similares a containers nomeados para classes de objetos de domínio que são altamente coesos entre si. Além disso, deve ter baixo acoplamento entre classes que estão em módulos diferentes. Sendo que um ou mais agregados podem estar juntos somente se fizer sentido ao negócio.

Assim como os outros objetos do DDD, os módulos devem ser nomeados adequadamente, respeitando a linguagem ubíqua.

**EXEMPLOS DE MÓDULOS** 

- [product](./source/src/domain/product/)
- [product-infra](./source/src/infra/product),
- [customer](./source/src/domain/customer/)
- [customer-infra](./source/src/infra/customer)
- [checkout](./source/src/domain/checkout/)
- [checkout-infra](./source/src/infra/checkout)

## 5.9 FÁBRICAS (FACTORIES)

São objetos responsáveis por criar instâncias de objetos complexos e agregadores para um objeto separado, que pode não ter responsabilidade no modelos de domínio, mas ainda faz parte do design do domínio. Em outras palavras, são objetos que encapsula toda a criação complexa e que não exija que o cliente faça referência as classes concretas que estão sendo instanciadas.

**EXEMPLOS DE FÁBRICAS**
- [customer.factory](./source/src/domain/customer/factory/customer.factory.ts)
