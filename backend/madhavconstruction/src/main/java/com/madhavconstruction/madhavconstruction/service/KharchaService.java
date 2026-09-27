package com.madhavconstruction.madhavconstruction.service;

import com.lowagie.text.*;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import com.madhavconstruction.madhavconstruction.model.KharchaModel;
import com.madhavconstruction.madhavconstruction.repository.KharchaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;


import java.io.ByteArrayOutputStream;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@Service
public class KharchaService {
    public KharchaService(KharchaRepository repository) {
        this.repository = repository;
    }

    @Autowired
    private final KharchaRepository repository;

    public KharchaModel addKharcha(KharchaModel kharcha) {
        if (kharcha.getCompany() != null) {
            kharcha.setCompany(kharcha.getCompany().trim().toLowerCase()); // normalize
        }
        return repository.save(kharcha);
    }   

    public List<KharchaModel> getAllKharcha() {
        return repository.findAll();
    }

    public int getTotalMoney() {
        return repository.findAll().stream()
                .mapToInt(KharchaModel::getMoney)
                .sum();
    }


    public Page<KharchaModel> getKharcha(String company, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("date").ascending());

        if (company != null && !company.isEmpty()) {
            return repository.findByCompanyContainingIgnoreCase(company, pageable);
        } else {
            return repository.findAll(pageable);
        }
    }



    public byte[] generateKharchaPdf(List<KharchaModel> kharchas) {
        try {
            Document document = new Document();
            ByteArrayOutputStream out = new ByteArrayOutputStream();

            PdfWriter.getInstance(document, out);
            document.open();

            // Title
            Font CompanyFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 28);
            Paragraph Companytitle = new Paragraph("Madhav Constructions", CompanyFont);
            Companytitle.setAlignment(Element.ALIGN_CENTER);
            document.add(Companytitle);

            Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18);
            Paragraph title = new Paragraph("My Kharcha Report", titleFont);
            title.setAlignment(Element.ALIGN_CENTER);
            document.add(title);

            Font dateFont = FontFactory.getFont(FontFactory.HELVETICA_OBLIQUE, 12);
            String downloadDate = "("+LocalDate.now().format(DateTimeFormatter.ofPattern("dd-MM-yyyy"))+")";
            Paragraph dateParagraph = new Paragraph(downloadDate, dateFont);
            dateParagraph.setAlignment(Element.ALIGN_CENTER);
            document.add(dateParagraph);
            document.add(Chunk.NEWLINE);


            // Table setup
            PdfPTable table = new PdfPTable(5);
            table.setWidthPercentage(100);
            table.setWidths(new int[]{2,2,5,3,3});

            Font headFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD);

            // Headers
            table.addCell(new PdfPCell(new Phrase("S.No", headFont)));
            table.addCell(new PdfPCell(new Phrase("Date", headFont)));
            table.addCell(new PdfPCell(new Phrase("Company", headFont)));
            table.addCell(new PdfPCell(new Phrase("Description", headFont)));
            table.addCell(new PdfPCell(new Phrase("Amount", headFont)));

            // Data rows

            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
            int index = 1;
            double total = 0;
            for (KharchaModel k : kharchas) {
                table.addCell(String.valueOf(index++));
                table.addCell(k.getDate() != null ? k.getDate().format(formatter) : "-"); // ✅ formatted date
                table.addCell(k.getCompany());
                table.addCell(k.getDescription());
                table.addCell(String.valueOf(k.getMoney())); // ✅ use getMoney()
                total += k.getMoney();
            }

            // Total row
            PdfPCell totalCell = new PdfPCell(new Phrase("Total", headFont));
            totalCell.setColspan(4); // spans first 4 columns
            totalCell.setHorizontalAlignment(Element.ALIGN_RIGHT);
            table.addCell(totalCell);

            PdfPCell totalValue = new PdfPCell(new Phrase(String.format("%.2f", total), headFont));
            totalValue.setHorizontalAlignment(Element.ALIGN_RIGHT);
            table.addCell(totalValue);

            // Add table to document
            document.add(table);
            document.close();

            return out.toByteArray();

        } catch (Exception e) {
            throw new RuntimeException("Error while generating PDF", e);
        }
    }

    public KharchaModel updateKharcha(String id, KharchaModel updatedKharcha) {
        Optional<KharchaModel> existing = repository.findById(id);
        if (existing.isEmpty()) {
            throw new RuntimeException("Kharcha record not found with ID: " + id);
        }

        KharchaModel kharcha = existing.get();

        // Update only non-null fields
        if (updatedKharcha.getCompany() != null)
            kharcha.setCompany(updatedKharcha.getCompany().trim().toLowerCase());
        if (updatedKharcha.getDescription() != null)
            kharcha.setDescription(updatedKharcha.getDescription());
        if (updatedKharcha.getDate() != null)
            kharcha.setDate(updatedKharcha.getDate());
        if (updatedKharcha.getMoney() != 0)
            kharcha.setMoney(updatedKharcha.getMoney());

        return repository.save(kharcha);
    }

    // ✅ DELETE
    public void deleteKharcha(String id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Kharcha record not found with ID: " + id);
        }
        repository.deleteById(id);
    }
    }


