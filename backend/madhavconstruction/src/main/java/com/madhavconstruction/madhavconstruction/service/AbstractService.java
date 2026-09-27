package com.madhavconstruction.madhavconstruction.service;
import com.madhavconstruction.madhavconstruction.model.AbstractModel;
import com.madhavconstruction.madhavconstruction.repository.AbstractRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

@Service
public class AbstractService {

    public AbstractService(AbstractRepository billRepository) {
        this.billRepository = billRepository;
    }

    @Autowired
        private  AbstractRepository billRepository;
    public AbstractModel create(AbstractModel bill) {
        // ensure sections/entries have ids and calculate amounts/totals
        return billRepository.save(bill);
    }

        public AbstractModel update(String id, AbstractModel payload) {
            return billRepository.findById(id).map(existing -> {
                existing.setCompanyName(payload.getCompanyName());
                existing.setWorkName(payload.getWorkName());
                existing.setDate(payload.getDate());
                existing.setBillNo(payload.getBillNo());
                existing.setAbstractSection(payload.getAbstractSection());
                return billRepository.save(existing);
            }).orElseThrow(() -> new RuntimeException("Bill not found"));
        }

        public void delete(String id) {
            billRepository.deleteById(id);
        }

        public AbstractModel getById(String id) {
            return billRepository.findById(id).orElse(null);
        }

        public Page<AbstractModel> listAll(int page, int size) {
            Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "date"));
            return billRepository.findAll(pageable);
        }
    public Page<AbstractModel> search(String keyword, int page, int size) {
        return billRepository.findByCompanyNameContainingIgnoreCaseOrWorkNameContainingIgnoreCase(
                keyword, keyword, PageRequest.of(page, size)
        );
    }


}
