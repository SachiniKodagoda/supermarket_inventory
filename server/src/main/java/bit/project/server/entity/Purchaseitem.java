package bit.project.server.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Data
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
public class Purchaseitem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;


    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    private Purchase purchase;

    @ManyToOne
    private Item item;

    private Integer qty;

    private BigDecimal unitprice;

    public Purchaseitem(Integer id) {
        this.id = id;
    }
}
